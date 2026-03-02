use axum::{
    extract::{Path, State, ws::{WebSocket, WebSocketUpgrade}},
    http::StatusCode,
    response::IntoResponse,
    routing::get,
    Json, Router,
};
use chrono::Utc;
use serde::Serialize;
use std::collections::HashMap;
use std::net::SocketAddr;
use std::sync::Arc;
use tokio::net::TcpListener;
use tokio::sync::{Mutex, RwLock};
use tower_http::cors::{Any, CorsLayer};
use futures_util::stream::StreamExt;
use yrs::sync::Awareness;
use yrs_axum::broadcast::BroadcastGroup;
use yrs_axum::ws::{AxumSink, AxumStream};

mod storage;
mod user_generator;

#[derive(Serialize)]
struct HealthResponse {
    status: String,
    timestamp: String,
}

async fn health_check() -> impl IntoResponse {
    let response = HealthResponse {
        status: "ok".to_string(),
        timestamp: Utc::now().to_rfc3339(),
    };
    (StatusCode::OK, Json(response))
}

async fn user_info() -> impl IntoResponse {
    let user = user_generator::generate_user();
    (StatusCode::OK, Json(user))
}

struct AppState {
    rooms: RwLock<HashMap<String, Arc<BroadcastGroup>>>,
}

async fn ws_handler(
    Path(document_id): Path<String>,
    State(state): State<Arc<AppState>>,
    ws: WebSocketUpgrade,
) -> impl IntoResponse {
    ws.on_upgrade(move |socket| async move {
        // Find or create the broadcast group for this document
        let bcast = {
            let mut rooms = state.rooms.write().await;
            if let Some(group) = rooms.get(&document_id) {
                group.clone()
            } else {
                let doc = storage::load_document();
                let awareness = Arc::new(RwLock::new(Awareness::new(doc)));
                let bcast = Arc::new(BroadcastGroup::new(awareness, 100).await);
                rooms.insert(document_id.clone(), bcast.clone());
                bcast
            }
        };

        let (sink, stream) = socket.split();
        let sink = Arc::new(Mutex::new(AxumSink::from(sink)));
        let stream = AxumStream::from(stream);

        let sub = bcast.subscribe(sink, stream);
        match sub.completed().await {
            Ok(_) => println!("Document {} connection finished", document_id),
            Err(e) => println!("Document {} connection error: {:?}", document_id, e),
        }
    })
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    let state = Arc::new(AppState {
        rooms: RwLock::new(HashMap::new()),
    });

    let app = Router::new()
        .route("/health", get(health_check))
        .route("/user", get(user_info))
        .route("/doc/{documentId}", get(ws_handler))
        .with_state(state)
        .layer(cors);

    let port: u16 = std::env::var("PORT")
        .unwrap_or_else(|_| "3050".to_string())
        .parse()?;
    
    let addr = SocketAddr::from(([0, 0, 0, 0], port));
    println!("Listening on port {}", port);

    let listener = TcpListener::bind(addr).await?;
    axum::serve(listener, app).await?;

    Ok(())
}
