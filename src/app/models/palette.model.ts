import Color from 'colorjs.io';

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
  stepper: number;
  shades: Array<Color>;
  id: string;

  constructor(
    source: string,
    name: string,
    gamut: GamutType,
    space: PaletteSpace,
    stepper: number,
    shades: Array<Color>,
    id: string
  ) {
    this.source = source;
    this.name = name;
    this.gamut = gamut;
    this.space = space;
    this.stepper = stepper;
    this.shades = shades;
    this.id = id;
  }
}
