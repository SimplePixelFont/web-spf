# web-spf

An implementation of SimplePixelFont rendering for the web.

# About

`web=spf` provides a native api for loading and rendering .spf` files in the web. The api uses HTML's custom elements to define unique spf tags. And internally uses [`render_spf`](https://github.com/The-Nice-One/web-spf/tree/main/crates/render_spf), a framework for creating textures from `.spf` text strings. You can see a live demo at the following site: [https://the-nice-one.github.io/web-spf/](https://the-nice-one.github.io/web-spf/).

# Usage

Copy the [pkg](pkg/) directory and [web_spf.js](web_spf.js) file in your project. Then in your html document add the following script tag:
```html
<script src="./web_spf.js" type="module"></script>
```

Now you can load fonts with the `spf-font` tag:
```html
<spf-font src="./Peaberry.spf"></spf-font>
```

Add the `default` attribute to set the font as the default for all text-renderings:
```html
<spf-font src="./Peaberry.spf" default></spf-font>
```

Lastly, use the `spf-text` to render any text:
```html
<!-- You can even use custom styles like height to simulate custom text size! -->
<spf-text style="height: 8rem;" class="bannerText">Hello!</spf-text>
```