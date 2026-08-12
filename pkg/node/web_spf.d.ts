/* tslint:disable */
/* eslint-disable */

export class BadgeSocket {
    free(): void;
    [Symbol.dispose](): void;
    constructor();
    set color(value: string);
    set label(value: PrintSocket);
    set label_color(value: string);
    set logo(value: Texture);
    set message(value: PrintSocket);
}

export class PrintSocket {
    free(): void;
    [Symbol.dispose](): void;
    constructor();
    set letter_spacing(value: number);
    set processor(value: Function);
    set text(value: string);
}

export class TableEntry {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    colors: string[];
}

export class Texture {
    free(): void;
    [Symbol.dispose](): void;
    constructor();
    height: number;
    texture_data: Uint8Array;
    width: number;
}

export function get_printer_colors(layout_name: string): TableEntry[];

export function load_layout_from_file(layout_name: string, layout_bytes: Uint8Array, _default: boolean): string;

export function loaded(): boolean;

export function print_badge(socket: BadgeSocket): Texture;

export function print_text(socket: PrintSocket): Texture;

export function set_printer_color(layout_name: string, table_index: number, color_index: number, hex_color: string): void;
