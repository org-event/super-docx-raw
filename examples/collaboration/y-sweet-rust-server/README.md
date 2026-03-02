# Yjs Server (Rust / Axum)

Это порт оригинального сервера совместного редактирования `examples/collaboration/production/server` на Rust, использующий:
* [Axum](https://github.com/tokio-rs/axum) — как основной HTTP/WebSocket фреймворк
* [Yrs](https://docs.rs/yrs) — официальную реализацию Yjs на Rust от создателя Yjs (автоматическая синхронизация CRDT структур)
* [yrs-axum](https://crates.io/crates/yrs-axum) — клей для интеграции протокола Yjs по веб-сокетам (y-websocket/y-sync)

Сервер имеет абсолютно идентичный функционал оригинальному nodejs-серверу для обеспечения работы `examples/collaboration/production/client`.

## Запуск сервера

Для запуска вам понадобится установленный набор утилит языка [Rust](https://rustup.rs/) (rustup, `cargo`, `rustc`).

1. Перейдите в корневую директорию этого Rust сервера:
   ```bash
   cd examples/collaboration/y-sweet-rust-server
   ```
2. Откройте терминал и просто соберите и запустите проект с помощью команды cargo (все нужные зависимости скачаются автоматически):
   ```bash
   cargo run
   ```
   > Также можно задать порт запуска через переменную окружения `PORT=3050 cargo run`.

3. Сервер запустится на http://localhost:3050.

## Эндпоинты API

- `GET /health` — проверка статуса сервера. Возвращает `{"status":"ok", "timestamp":"..."}`.
- `GET /user` — генерация фейкового пользователя. Возвращает `{"name":"...", "email":"..."}`.
- `GET /doc/:documentId` (WebSocket) — подключение к совместному редактированию документа по протоколу Yjs. Каждый отдельный URL (`documentId`) создает независимую "комнату" (Document / Broadcast Group). Хранилище (Mock) изначально отдает дефолтный пустой DOCX документ.
