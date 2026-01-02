
let imports = {};
imports['__wbindgen_placeholder__'] = module.exports;
let wasm;
const { TextEncoder, TextDecoder } = require(`util`);

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_export_2.set(idx, obj);
    return idx;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

let WASM_VECTOR_LEN = 0;

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

let cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
}
/**
 * @param {PrintSocket} socket
 * @returns {Texture}
 */
module.exports.print_text = function(socket) {
    _assertClass(socket, PrintSocket);
    var ptr0 = socket.__destroy_into_raw();
    const ret = wasm.print_text(ptr0);
    return Texture.__wrap(ret);
};

/**
 * @returns {boolean}
 */
module.exports.loaded = function() {
    const ret = wasm.loaded();
    return ret !== 0;
};

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_export_2.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}
/**
 * @param {string} layout_name
 * @param {Uint8Array} layout_bytes
 * @param {boolean} _default
 * @returns {string}
 */
module.exports.load_layout_from_file = function(layout_name, layout_bytes, _default) {
    let deferred4_0;
    let deferred4_1;
    try {
        const ptr0 = passStringToWasm0(layout_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(layout_bytes, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.load_layout_from_file(ptr0, len0, ptr1, len1, _default);
        var ptr3 = ret[0];
        var len3 = ret[1];
        if (ret[3]) {
            ptr3 = 0; len3 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred4_0 = ptr3;
        deferred4_1 = len3;
        return getStringFromWasm0(ptr3, len3);
    } finally {
        wasm.__wbindgen_free(deferred4_0, deferred4_1, 1);
    }
};

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}
/**
 * @param {BadgeSocket} socket
 * @returns {Texture}
 */
module.exports.print_badge = function(socket) {
    _assertClass(socket, BadgeSocket);
    var ptr0 = socket.__destroy_into_raw();
    const ret = wasm.print_badge(ptr0);
    return Texture.__wrap(ret);
};

const BadgeSocketFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_badgesocket_free(ptr >>> 0, 1));

class BadgeSocket {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BadgeSocketFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_badgesocket_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.badgesocket_new();
        this.__wbg_ptr = ret >>> 0;
        BadgeSocketFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {PrintSocket} socket
     */
    set label(socket) {
        _assertClass(socket, PrintSocket);
        var ptr0 = socket.__destroy_into_raw();
        wasm.badgesocket_set_label(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {PrintSocket} socket
     */
    set message(socket) {
        _assertClass(socket, PrintSocket);
        var ptr0 = socket.__destroy_into_raw();
        wasm.badgesocket_set_message(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string} label_color
     */
    set label_color(label_color) {
        const ptr0 = passStringToWasm0(label_color, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.badgesocket_set_label_color(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} color
     */
    set color(color) {
        const ptr0 = passStringToWasm0(color, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.badgesocket_set_color(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Texture} logo
     */
    set logo(logo) {
        _assertClass(logo, Texture);
        var ptr0 = logo.__destroy_into_raw();
        wasm.badgesocket_set_logo(this.__wbg_ptr, ptr0);
    }
}
module.exports.BadgeSocket = BadgeSocket;

const PrintSocketFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_printsocket_free(ptr >>> 0, 1));

class PrintSocket {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PrintSocketFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_printsocket_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.printsocket_new();
        this.__wbg_ptr = ret >>> 0;
        PrintSocketFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {string} text
     */
    set text(text) {
        const ptr0 = passStringToWasm0(text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.printsocket_set_text(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {number} letter_spacing
     */
    set letter_spacing(letter_spacing) {
        wasm.printsocket_set_letter_spacing(this.__wbg_ptr, letter_spacing);
    }
    /**
     * @param {Function} processor
     */
    set processor(processor) {
        wasm.printsocket_set_processor(this.__wbg_ptr, processor);
    }
}
module.exports.PrintSocket = PrintSocket;

const TextureFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_texture_free(ptr >>> 0, 1));

class Texture {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Texture.prototype);
        obj.__wbg_ptr = ptr;
        TextureFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TextureFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_texture_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.texture_new();
        this.__wbg_ptr = ret >>> 0;
        TextureFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    get width() {
        const ret = wasm.texture_width(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get height() {
        const ret = wasm.texture_height(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {Uint8Array}
     */
    get texture_data() {
        const ret = wasm.texture_texture_data(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @param {number} width
     */
    set width(width) {
        wasm.texture_set_width(this.__wbg_ptr, width);
    }
    /**
     * @param {number} height
     */
    set height(height) {
        wasm.texture_set_height(this.__wbg_ptr, height);
    }
    /**
     * @param {Uint8Array} texture_data
     */
    set texture_data(texture_data) {
        const ptr0 = passArray8ToWasm0(texture_data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.texture_set_texture_data(this.__wbg_ptr, ptr0, len0);
    }
}
module.exports.Texture = Texture;

module.exports.__wbg_call_7cccdd69e0791ae2 = function() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.call(arg1, arg2);
    return ret;
}, arguments) };

module.exports.__wbg_from_2a5d3e218e67aa85 = function(arg0) {
    const ret = Array.from(arg0);
    return ret;
};

module.exports.__wbg_get_b9b93047fe3cf45b = function(arg0, arg1) {
    const ret = arg0[arg1 >>> 0];
    return ret;
};

module.exports.__wbg_new_78feb108b6472713 = function() {
    const ret = new Array();
    return ret;
};

module.exports.__wbg_push_737cfc8c1432c2c6 = function(arg0, arg1) {
    const ret = arg0.push(arg1);
    return ret;
};

module.exports.__wbindgen_debug_string = function(arg0, arg1) {
    const ret = debugString(arg1);
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

module.exports.__wbindgen_init_externref_table = function() {
    const table = wasm.__wbindgen_export_2;
    const offset = table.grow(4);
    table.set(0, undefined);
    table.set(offset + 0, undefined);
    table.set(offset + 1, null);
    table.set(offset + 2, true);
    table.set(offset + 3, false);
    ;
};

module.exports.__wbindgen_number_get = function(arg0, arg1) {
    const obj = arg1;
    const ret = typeof(obj) === 'number' ? obj : undefined;
    getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
};

module.exports.__wbindgen_number_new = function(arg0) {
    const ret = arg0;
    return ret;
};

module.exports.__wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

const path = require('path').join(__dirname, 'web_spf_bg.wasm');
const bytes = require('fs').readFileSync(path);

const wasmModule = new WebAssembly.Module(bytes);
const wasmInstance = new WebAssembly.Instance(wasmModule, imports);
wasm = wasmInstance.exports;
module.exports.__wasm = wasm;

wasm.__wbindgen_start();

