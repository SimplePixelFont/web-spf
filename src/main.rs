use spf::printer::*;
use spf::cache::*;
use std::os::raw::c_char;
use std::ffi::CStr;
mod build;

pub static mut len: usize = 0;
pub static mut string_len: usize = 0;

#[no_mangle]
pub extern "C" fn get_texture(ptr: *const c_char, r: usize, g: usize, b: usize) -> *const u8 {
    let c_str = unsafe { CStr::from_ptr(ptr) };
    let string = c_str.to_str().unwrap();

    let font = build::compile_spf();
    let character_cache = CharacterCache::from_characters(&font.characters);
    let printer = Printer {
        font: font,
        character_cache: character_cache,
        letter_spacing: 1
    };

    
    unsafe {
        string_len = string.len();
    }

    let text = printer.new_text(String::from(string)).flatten_replace(&[vec![255u8, 255u8, 255u8, 0u8], vec![r as u8, g as u8, b as u8, 255u8]]);
    unsafe {
        len = text.len()
    }

    let ptr = text.as_ptr();
    std::mem::forget(text);
    
    ptr
}

#[no_mangle]
pub extern  "C" fn get_len() -> usize {
    unsafe {
        len
    }
}

#[no_mangle]
pub extern  "C" fn get_string_len() -> usize {
    unsafe {
        string_len
    }
}


fn main() {}