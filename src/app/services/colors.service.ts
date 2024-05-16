import { Injectable } from '@angular/core';
import { Color } from '../models/color.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ColorsService {
  private _colors: Color[] = [];

  constructor(private localStorageService: LocalStorageService) {
    this.colors = this.localStorageService
      .getColors()
      .map(
        (colorData) =>
          new Color(
            colorData.name,
            colorData.hex,
            colorData.rgb,
            colorData.source,
            colorData.alpha
          )
      );
  }

  get colors(): Color[] {
    return this._colors;
  }

  addColor(color: Color): void {
    this.colors.push(color);
    this.saveColors();
  }

  saveColors(): void {
    const colorData = this.colors.map((color) => ({
      name: color.name,
      hex: color.hex,
      rgb: color.rgb,
      source: color.source,
      alpha: color.alpha,
    }));
    this.localStorageService.setColors(colorData);
  }

  set colors(newColors: Color[]) {
    this._colors = newColors;
  }

  removeColor(index: number) {
    this._colors.splice(index, 1);
  }

  // Add more methods as needed to modify the colors array
}
