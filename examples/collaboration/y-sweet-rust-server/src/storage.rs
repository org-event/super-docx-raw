use yrs::{Doc, Transact, Options, Map};

/// Loads an empty document with the default structure expected by SuperDoc (a "meta" map with a "docx" array).
pub fn load_document() -> Doc {
    let mut options = Options::default();
    options.client_id = 1;
    let doc = Doc::with_options(options);
    
    // Add minimal DOCX structure that the client expects
    let meta_map = doc.get_or_insert_map("meta");
    {
        let mut txn = doc.transact_mut();
        
        // Set "docx" to an empty array
        meta_map.insert(&mut txn, "docx", yrs::ArrayPrelim::default());
        txn.commit();
    }
    
    doc
}

/// A mock save function that does nothing, similar to the original storage.ts
pub async fn save_document(_id: &str, _file: Option<&[u8]>) -> bool {
    // No-op - just return success
    true
}
