use crate::*;
use ril::prelude::*;

#[wasm_bindgen]
#[derive(Debug)]
pub struct BadgeSocket {
    label: PrintSocket,
    message: PrintSocket,
    label_color: Rgba,
    color: Rgba,
    logo: Texture,
    padding: u32,
}

impl Default for BadgeSocket {
    fn default() -> Self {
        BadgeSocket {
            label: PrintSocket::default(),
            message: PrintSocket::default(),
            label_color: Rgba::transparent(),
            color: Rgba::transparent(),
            logo: Texture::default(),
            padding: 1,
        }
    }
}

#[wasm_bindgen]
impl BadgeSocket {
    #[wasm_bindgen(constructor)]
    pub fn new() -> BadgeSocket {
        BadgeSocket::default()
    }
    #[wasm_bindgen(setter)]
    pub fn set_label(&mut self, socket: PrintSocket) {
        self.label = socket;
    }
    #[wasm_bindgen(setter)]
    pub fn set_message(&mut self, socket: PrintSocket) {
        self.message = socket;
    }
    #[wasm_bindgen(setter)]
    pub fn set_label_color(&mut self, label_color: String) {
        self.label_color = Rgba::from_hex(&label_color).unwrap_throw();
    }
    #[wasm_bindgen(setter)]
    pub fn set_color(&mut self, color: String) {
        self.color = Rgba::from_hex(&color).unwrap_throw();
    }
    #[wasm_bindgen(setter)]
    pub fn set_logo(&mut self, logo: Texture) {
        self.logo = logo;
    }
}

#[wasm_bindgen]
pub fn print_badge(socket: BadgeSocket) -> Texture {
    let logo = socket.logo;
    let label = print_text(socket.label);
    let message = print_text(socket.message);

    let heights = [label.height, message.height, logo.height];
    let mut badge_height = heights.iter().max().unwrap_throw().to_owned();
    let mut badge_width = logo.width + label.width + message.width;

    badge_height += socket.padding * 2;
    badge_width += socket.padding * 5;

    let left_width = label.width + logo.width + socket.padding * 3;
    let right_width = message.width + socket.padding * 2;

    let mut texture = Texture {
        width: badge_width,
        height: badge_height,
        texture_data: Vec::new(),
    };

    let mut surface = Image::new(texture.width, texture.height, Rgba::transparent())
        .with_overlay_mode(OverlayMode::Merge);
    let label_rectangle = Rectangle::at(0, 0)
        .with_size(left_width, badge_height)
        .with_fill(socket.label_color);
    let message_rectangle = Rectangle::at(left_width, 0)
        .with_size(right_width, badge_height)
        .with_fill(socket.color);
    let logo_texture = Image::from_pixels(
        logo.width,
        logo.texture_data
            .chunks_exact(4)
            .map(|chunk| Rgba::from_rgba_tuple((chunk[0], chunk[1], chunk[2], chunk[3])))
            .collect::<Vec<_>>(),
    );
    let label_texture = Image::from_pixels(
        label.width,
        label
            .texture_data
            .chunks_exact(4)
            .map(|chunk| Rgba::from_rgba_tuple((chunk[0], chunk[1], chunk[2], chunk[3])))
            .collect::<Vec<_>>(),
    );
    let message_texture = Image::from_pixels(
        message.width,
        message
            .texture_data
            .chunks_exact(4)
            .map(|chunk| Rgba::from_rgba_tuple((chunk[0], chunk[1], chunk[2], chunk[3])))
            .collect::<Vec<_>>(),
    );
    surface.draw(&label_rectangle);
    surface.draw(&message_rectangle);

    let mut logo_offset_y = socket.padding;
    if logo.height < badge_height {
        logo_offset_y = (badge_height - logo.height) / 2;
    }
    let mut label_offset_y = socket.padding;
    if label.height < badge_height {
        label_offset_y = (badge_height - label.height) / 2;
    }
    let mut message_offset_y = socket.padding;
    if message.height < badge_height {
        message_offset_y = (badge_height - message.height) / 2;
    }

    surface.paste(socket.padding, logo_offset_y, &logo_texture);
    surface.paste(
        logo.width + socket.padding * 2,
        label_offset_y,
        &label_texture,
    );
    surface.paste(
        left_width + socket.padding * 1,
        message_offset_y,
        &message_texture,
    );

    if surface.height() <= 8 {
        surface.resize(
            surface.width() * 3,
            surface.height() * 3,
            ResizeAlgorithm::Nearest,
        );
    } else if surface.height() <= 12 {
        surface.resize(
            surface.width() * 2,
            surface.height() * 2,
            ResizeAlgorithm::Nearest,
        );
    }

    for row in surface.pixels() {
        for pixel in row.iter() {
            texture.texture_data.push(pixel.r);
            texture.texture_data.push(pixel.g);
            texture.texture_data.push(pixel.b);
            texture.texture_data.push(pixel.a);
        }
    }

    texture
}
