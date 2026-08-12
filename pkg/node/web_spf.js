/* @ts-self-types="./web_spf.d.ts" */

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
     * @param {string} color
     */
    set color(color) {
        const ptr0 = passStringToWasm0(color, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.badgesocket_set_color(this.__wbg_ptr, ptr0, len0);
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
     * @param {string} label_color
     */
    set label_color(label_color) {
        const ptr0 = passStringToWasm0(label_color, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.badgesocket_set_label_color(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Texture} logo
     */
    set logo(logo) {
        _assertClass(logo, Texture);
        var ptr0 = logo.__destroy_into_raw();
        wasm.badgesocket_set_logo(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {PrintSocket} socket
     */
    set message(socket) {
        _assertClass(socket, PrintSocket);
        var ptr0 = socket.__destroy_into_raw();
        wasm.badgesocket_set_message(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) BadgeSocket.prototype[Symbol.dispose] = BadgeSocket.prototype.free;
exports.BadgeSocket = BadgeSocket;

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
    /**
     * @param {string} text
     */
    set text(text) {
        const ptr0 = passStringToWasm0(text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.printsocket_set_text(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) PrintSocket.prototype[Symbol.dispose] = PrintSocket.prototype.free;
exports.PrintSocket = PrintSocket;

class TableEntry {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TableEntry.prototype);
        obj.__wbg_ptr = ptr;
        TableEntryFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TableEntryFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_tableentry_free(ptr, 0);
    }
    /**
     * @returns {string[]}
     */
    get colors() {
        const ret = wasm.__wbg_get_tableentry_colors(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {string[]} arg0
     */
    set colors(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_tableentry_colors(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) TableEntry.prototype[Symbol.dispose] = TableEntry.prototype.free;
exports.TableEntry = TableEntry;

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
    /**
     * @returns {number}
     */
    get height() {
        const ret = wasm.texture_height(this.__wbg_ptr);
        return ret >>> 0;
    }
    constructor() {
        const ret = wasm.texture_new();
        this.__wbg_ptr = ret >>> 0;
        TextureFinalization.register(this, this.__wbg_ptr, this);
        return this;
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
    /**
     * @param {number} width
     */
    set width(width) {
        wasm.texture_set_width(this.__wbg_ptr, width);
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
     * @returns {number}
     */
    get width() {
        const ret = wasm.texture_width(this.__wbg_ptr);
        return ret >>> 0;
    }
}
if (Symbol.dispose) Texture.prototype[Symbol.dispose] = Texture.prototype.free;
exports.Texture = Texture;

/**
 * @param {string} layout_name
 * @returns {TableEntry[]}
 */
function get_printer_colors(layout_name) {
    const ptr0 = passStringToWasm0(layout_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.get_printer_colors(ptr0, len0);
    var v2 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v2;
}
exports.get_printer_colors = get_printer_colors;

/**
 * @param {string} layout_name
 * @param {Uint8Array} layout_bytes
 * @param {boolean} _default
 * @returns {string}
 */
function load_layout_from_file(layout_name, layout_bytes, _default) {
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
}
exports.load_layout_from_file = load_layout_from_file;

/**
 * @returns {boolean}
 */
function loaded() {
    const ret = wasm.loaded();
    return ret !== 0;
}
exports.loaded = loaded;

/**
 * @param {BadgeSocket} socket
 * @returns {Texture}
 */
function print_badge(socket) {
    _assertClass(socket, BadgeSocket);
    var ptr0 = socket.__destroy_into_raw();
    const ret = wasm.print_badge(ptr0);
    return Texture.__wrap(ret);
}
exports.print_badge = print_badge;

/**
 * @param {PrintSocket} socket
 * @returns {Texture}
 */
function print_text(socket) {
    _assertClass(socket, PrintSocket);
    var ptr0 = socket.__destroy_into_raw();
    const ret = wasm.print_text(ptr0);
    return Texture.__wrap(ret);
}
exports.print_text = print_text;

/**
 * @param {string} layout_name
 * @param {number} table_index
 * @param {number} color_index
 * @param {string} hex_color
 */
function set_printer_color(layout_name, table_index, color_index, hex_color) {
    const ptr0 = passStringToWasm0(layout_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(hex_color, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    wasm.set_printer_color(ptr0, len0, table_index, color_index, ptr1, len1);
}
exports.set_printer_color = set_printer_color;

function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg___wbindgen_debug_string_dd5d2d07ce9e6c57: function(arg0, arg1) {
            const ret = debugString(arg1);
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_number_get_7579aab02a8a620c: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'number' ? obj : undefined;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg___wbindgen_string_get_914df97fcfa788f2: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'string' ? obj : undefined;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_throw_81fc77679af83bc6: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbg_call_d578befcc3145dee: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.call(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_from_741da0f916ab74aa: function(arg0) {
            const ret = Array.from(arg0);
            return ret;
        },
        __wbg_get_4848e350b40afc16: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_new_f3c9df4f38f3f798: function() {
            const ret = new Array();
            return ret;
        },
        __wbg_push_6bdbc990be5ac37b: function(arg0, arg1) {
            const ret = arg0.push(arg1);
            return ret;
        },
        __wbg_tableentry_new: function(arg0) {
            const ret = TableEntry.__wrap(arg0);
            return ret;
        },
        __wbindgen_cast_0000000000000001: function(arg0) {
            // Cast intrinsic for `F64 -> Externref`.
            const ret = arg0;
            return ret;
        },
        __wbindgen_cast_0000000000000002: function(arg0, arg1) {
            // Cast intrinsic for `Ref(String) -> Externref`.
            const ret = getStringFromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            const offset = table.grow(4);
            table.set(0, undefined);
            table.set(offset + 0, undefined);
            table.set(offset + 1, null);
            table.set(offset + 2, true);
            table.set(offset + 3, false);
        },
    };
    return {
        __proto__: null,
        "./web_spf_bg.js": import0,
    };
}

const BadgeSocketFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_badgesocket_free(ptr >>> 0, 1));
const PrintSocketFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_printsocket_free(ptr >>> 0, 1));
const TableEntryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_tableentry_free(ptr >>> 0, 1));
const TextureFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_texture_free(ptr >>> 0, 1));

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_externrefs.set(idx, obj);
    return idx;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
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

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getDataViewMemory0();
    const result = [];
    for (let i = ptr; i < ptr + 4 * len; i += 4) {
        result.push(wasm.__wbindgen_externrefs.get(mem.getUint32(i, true)));
    }
    wasm.__externref_drop_slice(ptr, len);
    return result;
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return decodeText(ptr, len);
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4, 4) >>> 0;
    for (let i = 0; i < array.length; i++) {
        const add = addToExternrefTable0(array[i]);
        getDataViewMemory0().setUint32(ptr + 4 * i, add, true);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}

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
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_externrefs.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
function decodeText(ptr, len) {
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    };
}

let WASM_VECTOR_LEN = 0;

const wasmPath = `${__dirname}/web_spf_bg.wasm`;
const wasmBytes = require('fs').readFileSync(wasmPath);
const wasmModule = new WebAssembly.Module(wasmBytes);
let wasm = new WebAssembly.Instance(wasmModule, __wbg_get_imports()).exports;
wasm.__wbindgen_start();
