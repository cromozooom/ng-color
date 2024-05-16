export class Color {
  name: string;
  source: string;
  hex: string;
  rgb: string;
  alpha: number;

  constructor(
    name: string,
    source: string,
    hex: string,
    rgb: string,
    alpha: number
  ) {
    this.name = name;
    this.source = source;
    this.hex = hex;
    this.rgb = rgb;
    this.alpha = alpha;
  }
}
