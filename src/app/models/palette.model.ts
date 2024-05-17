import { v4 as uuid4 } from 'uuid';

export enum PaletteSpace {
  hsl = 'hsl',
  lch = 'lch',
  oklch = 'oklch',
  lab = 'lab',
  p3 = 'p3',
}
export enum GamutType {
  sRGB = 'sRGB',
  unlimited = 'Unlimited palettes',
}
export class Palette {
  source: string;
  name: string;
  gamut: GamutType;
  space: PaletteSpace;
  id: string;

  constructor(source: string, name: string) {
    this.source = source;
    this.name = name;
    this.gamut = GamutType.sRGB;
    this.space = PaletteSpace.oklch;
    this.id = uuid4();
  }
}
