# web-spf

An implementation of SimplePixelFont rendering for the web.

# About

`web-spf` provides a native api for loading and rendering `.spf` files in the web. The api uses HTML's custom elements to define unique spf tags. And internally uses [`render_spf`](https://github.com/The-Nice-One/web-spf/tree/main/crates/render_spf), a framework for creating textures from `.spf` text strings. You can see a live demo at the following site: [https://simplepixelfont.github.io/web-spf/](https://simplepixelfont.github.io/web-spf/).

# Usage

Copy the [pkg](pkg/) directory in your project. Then, in your html document add the following script tag:
```html
<script src="./pkg/web/js/dom_elements.js" type="module"></script>
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

# NPM installation

You can [install `web-spf` with from npm](https://www.npmjs.com/package/web-spf) with the following command.
```bash
npm i web-spf
```

Then you can use `web-spf` functionality in CommonJS via the following require.
```js
const spf = require("web-spf");
```

Or you can also import the package for use in ECMAScript modules.
```js
import init, { loaded, load_layout_from_file, print_text, PrintSocket, Texture, BadgeSocket, print_badge } from 'path/to/web-spf/pkg-web/web_spf.js';
```
