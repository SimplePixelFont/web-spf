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
