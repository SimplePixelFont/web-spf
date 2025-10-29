import init, { loaded, load_layout_from_file, print_text, PrintSocket, Texture, BadgeSocket, print_badge } from '../web_spf.js';

var wasmLoaded = false;

var layoutsLoaded = [];
var defaultLayout = null;

class SPFFont extends HTMLElement {
    static observedAttributes = ["src"];

    constructor() { super(); }
    async connectedCallback() {
        const source = this.getAttribute("src");
        if (source === null) {
            return;
        }
        let is_default = this.hasAttribute("default");

        let bytes = await loadFileAsByteArray(source);
        const result = await load_layout_from_file(source, bytes, is_default);

        layoutsLoaded.push(result);
        if (is_default) {
            defaultLayout = result;
        }
    }
    disconnectedCallback() { }
    adoptedCallback() { }
    attributeChangedCallback(name, oldValue, newValue) { }
}

class SPFText extends HTMLElement {
    static observedAttributes = ["font", "letter-spacing"];

    update_texture() {
        if (!this.canDraw) {
            return;
        }

        const text = this.textContent;
        if (text === '' || text === null) {
            this.shadowRoot.children[1].src = "";
            this.shadowRoot.children[1].style.display = "none";
            return;
        } else {
            this.shadowRoot.children[1].style.display = "inline";
        }

        let socket = new PrintSocket();
        socket.text = text;
        if (this.hasAttribute("letter-spacing")) {
            socket.letter_spacing = this.getAttribute("letter-spacing");
        } else {
            socket.letter_spacing = 1;
        }
        if (typeof this.ondraw === 'function') {
            socket.processor = this.ondraw;
        }
        const texture = print_text(socket);
        const width = texture.width;
        const height = texture.height;
        const texture_data = texture.texture_data;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = width;
        canvas.height = height;

        const imageData = ctx.createImageData(canvas.width, canvas.height);

        for (let i = 0; i < imageData.data.length; i += 1) {
            imageData.data[i] = texture_data[i];
        }

        ctx.putImageData(imageData, 0, 0);
        this.shadowRoot.children[1].src = canvas.toDataURL();
    }

    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                    width: auto;
                    height: auto;
                }

                img {
                    width: 100%;
                    height: 100%;
                }
            </style>
            `;

        this.previousTextContent = this.textContent
        this.setupMutationObserver();

        this.canDraw = false;
    }

    setupMutationObserver() {
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                const content = mutation.target.textContent;
                // Otherwise we get multiple update_texture() calls even if we
                // if we check if mutation is equal to characterData.
                if (content !== this.previousTextContent) {
                    this.previousTextContent = content;
                    this.update_texture();
                }
            })
        });
        this.observer.observe(this, {
            childList: true,
            subtree: false,
            characterData: true
        });
    }

    async connectedCallback() {
        const img = document.createElement('img');
        img.style.imageRendering = "pixelated";
        this.shadowRoot.appendChild(img);
        await waitUntilDefaultLayout();
        this.canDraw = true;
        this.update_texture();
    }

    disconnectedCallback() { }
    adoptedCallback() { }
    attributeChangedCallback(name, oldValue, newValue) { }
}

async function waitUntilDefaultLayout(timeoutMs = 5000, checkIntervalMs = 100) {
    const startTime = Date.now();

    while (Date.now() - startTime < timeoutMs) {
        if (defaultLayout !== null) {
            return true;
        }
        await new Promise(resolve => setTimeout(resolve, checkIntervalMs));
    }
    return false;
}

async function loadFileAsByteArray(path) {
    try {
        const response = await fetch(path);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const buffer = await response.arrayBuffer();
        const byteArray = new Uint8Array(buffer);

        return byteArray;
    } catch (error) {
        console.error('Error loading file:', error);
    }
}

async function getImageRgbaBytes(imageUrl) {
  const image = new Image();
  image.src = imageUrl;
  image.crossOrigin = 'anonymous';

  await image.decode(); // Wait for the image to load and decode

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  canvas.width = image.width;
  canvas.height = image.height;

  context.drawImage(image, 0, 0);

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  return [canvas.width, canvas.height, imageData.data]; // This is the Uint8ClampedArray of RGBA bytes
}

async function init_spf() {
    await init();
    await loaded();
    wasmLoaded = true;

    customElements.define("spf-font", SPFFont);
    customElements.define("spf-text", SPFText);

    await waitUntilDefaultLayout();
    console.log("Default layout loaded");
    let hello_socket = new PrintSocket();
    hello_socket.text = "BinaryBuilder";
    hello_socket.letter_spacing = 2;
    let world_socket = new PrintSocket();
    world_socket.text = "Passing";
    world_socket.letter_spacing = 2;


    let socket = new BadgeSocket();
    socket.label = hello_socket;
    socket.message = world_socket;
    socket.label_color = "#0c0c0c";
    socket.color = "#00FF00";
    let logo = await getImageRgbaBytes("https://raw.githubusercontent.com/The-Nice-One/GalleryArt/refs/heads/main/emojis/julia.png");
    let logo_texture = new Texture();
    logo_texture.width = logo[0];
    logo_texture.height = logo[1];
    logo_texture.texture_data = logo[2];
    socket.logo = logo_texture;
    const texture = print_badge(socket);
    console.log("we good so far!");

    const width = texture.width;
    const height = texture.height;
    const texture_data = texture.texture_data;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    const imageData = ctx.createImageData(canvas.width, canvas.height);

    for (let i = 0; i < imageData.data.length; i += 1) {
        imageData.data[i] = texture_data[i];
    }

    ctx.putImageData(imageData, 0, 0);

    const img = document.createElement('img');
    img.style.imageRendering = "pixelated";
    img.src = canvas.toDataURL();
    document.body.appendChild(img);
}

init_spf()
export { SPFFont, SPFText };
