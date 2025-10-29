use render_spf::*;
use spf::core::*;
use std::collections::HashMap;
use std::sync::{OnceLock, RwLock};
use wasm_bindgen::prelude::*;

mod print;
pub use print::*;
mod badge;
pub use badge::*;

#[wasm_bindgen]
extern "C" {
    pub fn alert(s: &str);
}

pub static FONT_COLLECTION: OnceLock<RwLock<HashMap<String, Layout>>> = OnceLock::new();
pub static FONT_CACHE: OnceLock<RwLock<HashMap<String, FontCache>>> = OnceLock::new();
pub static DEFAULT_FONT: RwLock<String> = RwLock::new(String::new());

pub fn font_collection() -> &'static RwLock<HashMap<String, Layout>> {
    FONT_COLLECTION.get_or_init(|| RwLock::new(HashMap::new()))
}

pub fn font_cache() -> &'static RwLock<HashMap<String, FontCache>> {
    FONT_CACHE.get_or_init(|| RwLock::new(HashMap::new()))
}

#[wasm_bindgen]
pub fn loaded() -> bool {
    true
}

#[wasm_bindgen]
pub fn load_layout_from_file(
    layout_name: String,
    layout_bytes: Vec<u8>,
    default: bool,
) -> Result<String, String> {
    let layout = layout_from_data(layout_bytes).unwrap_throw();

    if default {
        *DEFAULT_FONT.write().unwrap() = layout_name.clone();
    }

    let mut cache = FontCache::default();
    cache.update(&layout);
    font_cache()
        .write()
        .unwrap()
        .insert(layout_name.clone(), cache);
    font_collection()
        .write()
        .unwrap()
        .insert(layout_name.clone(), layout);

    Ok(layout_name)
}

#[wasm_bindgen]
#[derive(Debug, Default)]
pub struct Texture {
    width: u32,
    height: u32,
    texture_data: Vec<u8>,
}

#[wasm_bindgen]
impl Texture {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Texture::default()
    }
    #[wasm_bindgen(getter)]
    pub fn width(&self) -> u32 {
        self.width
    }
    #[wasm_bindgen(getter)]
    pub fn height(&mut self) -> u32 {
        self.height
    }
    #[wasm_bindgen(getter)]
    pub fn texture_data(&self) -> Vec<u8> {
        self.texture_data.clone()
    }
    #[wasm_bindgen(setter)]
    pub fn set_width(&mut self, width: u32) {
        self.width = width;
    }
    #[wasm_bindgen(setter)]
    pub fn set_height(&mut self, height: u32) {
        self.height = height;
    }
    #[wasm_bindgen(setter)]
    pub fn set_texture_data(&mut self, texture_data: Vec<u8>) {
        self.texture_data = texture_data;
    }
}
