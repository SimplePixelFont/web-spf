use crate::*;
use js_sys::Array;

#[wasm_bindgen]
#[derive(Debug)]
pub struct PrintSocket {
    pub(crate) text: String,
    pub(crate) letter_spacing: u8,
    pub(crate) processor: Option<js_sys::Function>,
}

impl Default for PrintSocket {
    fn default() -> Self {
        PrintSocket {
            text: String::from(""),
            letter_spacing: 1,
            processor: None,
        }
    }
}

#[wasm_bindgen]
impl PrintSocket {
    #[wasm_bindgen(constructor)]
    pub fn new() -> PrintSocket {
        PrintSocket::default()
    }
    #[wasm_bindgen(setter)]
    pub fn set_text(&mut self, text: String) {
        self.text = text;
    }
    #[wasm_bindgen(setter)]
    pub fn set_letter_spacing(&mut self, letter_spacing: u8) {
        self.letter_spacing = letter_spacing;
    }
    #[wasm_bindgen(setter)]
    pub fn set_processor(&mut self, processor: js_sys::Function) {
        self.processor = Some(processor);
    }
}

#[wasm_bindgen]
pub fn print_text(socket: PrintSocket) -> Texture {
    let print_config = PrintConfig {
        letter_spacing: socket.letter_spacing,
        vertical_expand: true,
        vertical_align: VerticalAlign::Middle,
    };

    let surface = print(
        socket.text,
        &print_config,
        font_cache()
            .read()
            .unwrap()
            .get(&DEFAULT_FONT.read().unwrap().to_string())
            .unwrap(),
    );

    let mut texture = Texture {
        width: surface.width(),
        height: surface.height(),
        texture_data: Vec::new(),
    };

    let this = JsValue::null();
    for row in surface.pixels() {
        for pixel in row.iter() {
            let mut rgba = vec![pixel.r, pixel.g, pixel.b, pixel.a];
            if let Some(func) = &socket.processor {
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
            texture.texture_data.append(&mut rgba);

            // Maybe two functions, because the following would likely be more faster.
            // texture_data.push(pixel.r);
            // texture_data.push(pixel.g);
            // texture_data.push(pixel.b);
            // texture_data.push(pixel.a);
        }
    }
    texture
}
