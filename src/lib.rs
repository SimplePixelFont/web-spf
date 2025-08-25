use std::collections::HashMap;
use std::sync::{OnceLock, RwLock};
use js_sys::Array;
use spf::core::*;
use wasm_bindgen::prelude::*;
use render_spf::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

static FONT_COLLECTION: OnceLock<RwLock<HashMap<String, Layout>>> = OnceLock::new();
static CHARACTER_CACHE: OnceLock<RwLock<HashMap<String, CharacterCache>>> = OnceLock::new();
static DEFAULT_FONT: RwLock<String> = RwLock::new(String::new());

fn font_collection() -> &'static RwLock<HashMap<String, Layout>> {
    FONT_COLLECTION.get_or_init(|| RwLock::new(HashMap::new()))
}

fn character_cache() -> &'static RwLock<HashMap<String, CharacterCache>> {
    CHARACTER_CACHE.get_or_init(|| RwLock::new(HashMap::new()))
}

#[wasm_bindgen]
pub fn loaded() -> bool {
    true
}

#[wasm_bindgen]
pub fn load_layout_from_file(layout_name: String, layout_bytes: Vec<u8>, default: bool) -> Result<String, String> {
    let layout = layout_from_data(layout_bytes).unwrap_throw();
    
    if default {
        *DEFAULT_FONT.write().unwrap() = layout_name.clone();
    }
    
    let mut cache = CharacterCache::default();
    cache.update(&layout);
    character_cache().write().unwrap().insert(layout_name.clone(), cache);
    font_collection().write().unwrap().insert(layout_name.clone(), layout);

    Ok(layout_name)
}

#[wasm_bindgen]
pub fn print_text(text: String, processor: Option<js_sys::Function>) -> Vec<u8> {
    let print_config = PrintConfig {
        letter_spacing: 2
    };

    let surface = print_single_line(text, &print_config, &character_cache().read().unwrap().get(&DEFAULT_FONT.read().unwrap().to_string()).unwrap());
    let mut texture_data = Vec::new();
    texture_data.push(surface.height() as u8);
    
    let this = JsValue::null();
    for row in surface.pixels() {
        for pixel in row.iter() {
            let mut rgba = vec![pixel.r, pixel.g, pixel.b, pixel.a];
            if let Some(func) = &processor {
                let js_rgba = Array::new();
                js_rgba.push(&JsValue::from(rgba[0]));
                js_rgba.push(&JsValue::from(rgba[1]));
                js_rgba.push(&JsValue::from(rgba[2]));
                js_rgba.push(&JsValue::from(rgba[3]));

                let result = func.call1(&this, &js_rgba).unwrap();
                let js_array = Array::from(&result);

                for (index, color) in rgba.iter_mut().enumerate() {
                    let val = js_array.get(index as u32);
                    if let Some(num) = val.as_f64() {
                        *color = num as u8;
                    }
                }
            }
            texture_data.append(&mut rgba);

            // Maybe two functions, because the following would likely be more faster.
            // texture_data.push(pixel.r);
            // texture_data.push(pixel.g);
            // texture_data.push(pixel.b);
            // texture_data.push(pixel.a);
        } 
    }
    return texture_data
}