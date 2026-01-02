/* tslint:disable */
/* eslint-disable */
export function print_text(socket: PrintSocket): Texture;
export function loaded(): boolean;
export function load_layout_from_file(layout_name: string, layout_bytes: Uint8Array, _default: boolean): string;
export function print_badge(socket: BadgeSocket): Texture;
export class BadgeSocket {
  free(): void;
  constructor();
  set label(value: PrintSocket);
  set message(value: PrintSocket);
  set label_color(value: string);
  set color(value: string);
  set logo(value: Texture);
}
export class PrintSocket {
  free(): void;
  constructor();
  set text(value: string);
  set letter_spacing(value: number);
  set processor(value: Function);
}
export class Texture {
  free(): void;
  constructor();
  width: number;
  height: number;
  texture_data: Uint8Array;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_printsocket_free: (a: number, b: number) => void;
  readonly printsocket_new: () => number;
  readonly printsocket_set_text: (a: number, b: number, c: number) => void;
  readonly printsocket_set_letter_spacing: (a: number, b: number) => void;
  readonly printsocket_set_processor: (a: number, b: any) => void;
  readonly print_text: (a: number) => number;
  readonly loaded: () => number;
  readonly load_layout_from_file: (a: number, b: number, c: number, d: number, e: number) => [number, number, number, number];
  readonly __wbg_texture_free: (a: number, b: number) => void;
  readonly texture_new: () => number;
  readonly texture_width: (a: number) => number;
  readonly texture_height: (a: number) => number;
  readonly texture_texture_data: (a: number) => [number, number];
  readonly texture_set_width: (a: number, b: number) => void;
  readonly texture_set_height: (a: number, b: number) => void;
  readonly texture_set_texture_data: (a: number, b: number, c: number) => void;
  readonly __wbg_badgesocket_free: (a: number, b: number) => void;
  readonly badgesocket_new: () => number;
  readonly badgesocket_set_label: (a: number, b: number) => void;
  readonly badgesocket_set_message: (a: number, b: number) => void;
  readonly badgesocket_set_label_color: (a: number, b: number, c: number) => void;
  readonly badgesocket_set_color: (a: number, b: number, c: number) => void;
  readonly badgesocket_set_logo: (a: number, b: number) => void;
  readonly print_badge: (a: number) => number;
  readonly spf_core_layout_to_data: (a: number, b: number) => void;
  readonly spf_core_layout_from_data: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __externref_table_dealloc: (a: number) => void;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
