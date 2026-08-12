use render_spf::*;
use rgba_simple::Hex;
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
pub static PRINTER_CACHE: OnceLock<RwLock<HashMap<String, RgbaPrinter>>> = OnceLock::new();
pub static DEFAULT_FONT: RwLock<String> = RwLock::new(String::new());

pub fn font_collection() -> &'static RwLock<HashMap<String, Layout>> {
    FONT_COLLECTION.get_or_init(|| RwLock::new(HashMap::new()))
}

pub fn printer_cache() -> &'static RwLock<HashMap<String, RgbaPrinter>> {
    PRINTER_CACHE.get_or_init(|| RwLock::new(HashMap::new()))
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
    let layout = layout_from_data(&layout_bytes).unwrap_throw();

    if default {
        *DEFAULT_FONT.write().unwrap() = layout_name.clone();
    }

    let font_table = &layout.font_tables[0];
    let font = &font_table.fonts[0];
    let printer = RgbaPrinter::from_font(font_table, font, &layout, GenericPrintConfig::default());
    // printer.colors.set(0, 1, 40, 125, 0, 255);

    printer_cache()
        .write()
        .unwrap()
        .insert(layout_name.clone(), printer);
    font_collection()
        .write()
        .unwrap()
        .insert(layout_name.clone(), layout);

    Ok(layout_name)
}

#[wasm_bindgen]
pub fn get_printer_colors(layout_name: String) -> Vec<TableEntry> {
    let map = printer_cache().read().unwrap();
    let printer = map.get(&layout_name).unwrap();
    printer
        .colors
        .tables
        .iter()
        .map(|color: &Vec<ColorEntry>| TableEntry {
            colors: color
                .iter()
                .map(|rgba| {
                    let color = rgba_simple::RGBA::new(
                        rgba.current().0,
                        rgba.current().1,
                        rgba.current().2,
                        rgba.current().3,
                    );
                    color.to_hex()
                })
                .collect(),
        })
        .collect()
}

#[wasm_bindgen]
pub fn set_printer_color(
    layout_name: String,
    table_index: usize,
    color_index: usize,
    hex_color: String,
) {
    let mut map = printer_cache().write().unwrap();
    let printer = map.get_mut(&layout_name).unwrap();
    let rgba: rgba_simple::RGBA<u8> = rgba_simple::RGBA::from_hex(&hex_color).unwrap_throw();
    printer.colors.set(
        table_index,
        color_index,
        rgba.red,
        rgba.green,
        rgba.blue,
        rgba.alpha,
    );
}

#[wasm_bindgen]
#[derive(Debug, Default)]
pub struct TableEntry {
    #[wasm_bindgen(getter_with_clone)]
    pub colors: Vec<String>,
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
