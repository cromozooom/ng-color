import { Injectable } from '@angular/core';
import { Color, GamutType, ColorSpace } from '../models/color.model';
import { LocalStorageService } from './local-storage.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class ColorsService {
  private _colors: Color[] = [];
  private _gamut: GamutType = GamutType.sRGB;
  private _colorSpace: ColorSpace = ColorSpace.oklch;

  constructor(private localStorageService: LocalStorageService) {
    const colorsData = this.localStorageService.getColors();
    const gamutData = this.localStorageService.getGamut();
    const colorSpaceData = this.localStorageService.getColorSpace();

    this._gamut = gamutData;
    this._colorSpace = colorSpaceData;
    this._colors = colorsData.map(
      (colorData) => new Color(colorData.source, colorData.name)
    );
  }

  get gamut(): GamutType {
    return this._gamut;
  }
  get colorSpace(): ColorSpace {
    return this._colorSpace;
  }
  get colors(): Color[] {
    return this._colors;
  }
  set colors(newColors: Color[]) {
    this._colors = newColors;
  }

  addColor(color: Color): void {
    color.id = uuidv4();
    this._colors.push(color);
    this.saveColors();
  }

  saveColors(): void {
    const colorData = this.colors.map((color) => ({
      source: color.source,
      name: color.name,
      gamut: color.gamut,
      space: color.space,
      id: uuidv4(),
    }));
    this.localStorageService.setColors(colorData);
  }

  removeColor(index: number) {
    this._colors.splice(index, 1);
    this.saveColors();
  }
}
