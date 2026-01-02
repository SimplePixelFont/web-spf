use render_spf::*;
use spf::core::*;

fn main() {
    let buffer = std::fs::read("./Monogram.spf").unwrap();
    let layout = layout_from_data(&buffer).unwrap();

    let mut cache = FontCache::default();
    cache.update(&layout);
}
