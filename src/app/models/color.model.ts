import { v4 as uuid4 } from 'uuid';

export enum ColorSpace {
  hsl = 'hsl',
  lch = 'lch',
  oklch = 'oklch',
  lab = 'lab',
  p3 = 'p3',
}
export enum GamutType {
  sRGB = 'sRGB',
  unlimited = 'Unlimited colors',
}
export class Color {
  source: string;
  name: string;
  gamut: GamutType;
  space: ColorSpace;
  id: string;

  constructor(source: string, name: string) {
    this.source = source;
    this.name = name;
    this.gamut = GamutType.sRGB;
    this.space = ColorSpace.oklch;
    this.id = uuid4();
  }
}
