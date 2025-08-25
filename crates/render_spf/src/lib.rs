use ril::prelude::*;
use spf::core::*;
use std::collections::HashMap;

#[derive(Clone)]
pub struct AbstractCharacter {
    width: u8,
    height: u8,
    texture: Image<Rgba>,
    advance_x: u8,
}

impl std::default::Default for AbstractCharacter {
    fn default() -> Self {
        Self {
            width: 0,
            height: 0,
            texture: Image::new(1, 1, Rgba::transparent()),
            advance_x: 0,
        }
    }
}

#[derive(Clone, Default)]
pub struct CharacterCache {
    mappings: HashMap<String, AbstractCharacter>,
}

impl CharacterCache {
    pub fn update(&mut self, layout: &Layout) {
        let character_table = &layout.character_tables[0];
        let pixmap_table =
            &layout.pixmap_tables[character_table.pixmap_table_indexes.as_ref().unwrap()[0] as usize];
        let color_table =
            &layout.color_tables[pixmap_table.color_table_indexes.as_ref().unwrap()[0] as usize];

        for (index, character) in character_table.characters.iter().enumerate() {
            let mut abstract_character = AbstractCharacter::default();

            let pixmap_index = character.pixmap_index.or(Some(index as u8)).unwrap() as usize;
            let pixmap = pixmap_table.pixmaps[pixmap_index].clone();

            abstract_character.width = pixmap_table.constant_width.or(pixmap.custom_width).unwrap();
            abstract_character.height = pixmap_table
                .constant_height
                .or(pixmap.custom_height)
                .unwrap();
            abstract_character.advance_x = character
                .advance_x
                .or(Some(abstract_character.width))
                .unwrap();

            let mut pixels = Vec::new();
            for pixel in pixmap.data.iter() {
                let mut abstract_color = Rgba::transparent();
                let color = &color_table.colors[*pixel as usize];
                abstract_color.a = color_table.constant_alpha.or(color.custom_alpha).unwrap();
                abstract_color.r = color.r;
                abstract_color.g = color.g;
                abstract_color.b = color.b;
                pixels.push(abstract_color);
            }
            let texture = Image::from_pixels(abstract_character.width.into(), pixels);
            abstract_character.texture = texture;

            self
                .mappings
                .insert(character.grapheme_cluster.clone(), abstract_character);
        }
    }
}

#[derive(Default, Clone)]
pub struct PrintConfig {
    pub letter_spacing: u8,
}

pub fn print_single_line(text: String, print_config: &PrintConfig, character_cache: &CharacterCache) -> Image<Rgba> {
    let characters: Vec<char> = text.chars().collect();
    let mut width: u32 = (characters.len() - 1) as u32 * print_config.letter_spacing as u32;
    let mut height: u32 = 0;

    for (index, char) in characters.iter().enumerate() {
        let character = character_cache.mappings.get(&char.to_string()).unwrap();
        if index != characters.len()-1 {
            width += character.advance_x as u32;
        } else {
            width += character.width as u32;
        }
        if character.height as u32 > height {
            height = character.height as u32;
        }
    }

    let mut surface = Image::new(width, height, Rgba::transparent()).with_overlay_mode(OverlayMode::Merge);
    
    let mut current_x: u32 = 0;
    for char in characters {
        let character = character_cache.mappings.get(&char.to_string()).unwrap();
        surface.paste(current_x, 0, &character.texture);
        current_x += character.advance_x as u32 + print_config.letter_spacing as u32;
    }
    surface
}