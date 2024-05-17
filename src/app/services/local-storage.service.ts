import { Injectable } from '@angular/core';
import { Color, GamutType, ColorSpace } from '../models/color.model';
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storageKey = 'colors';
  private isLocalStorageAvailable: boolean;

  constructor() {
    this.isLocalStorageAvailable =
      typeof window !== 'undefined' && !!window.localStorage;
  }

  getGamut(): GamutType {
    if (this.isLocalStorageAvailable) {
      const gamutJson = window.localStorage.getItem(this.storageKey);
      return gamutJson ? JSON.parse(gamutJson) : GamutType.sRGB;
    }
    return GamutType.sRGB;
  }
  getColorSpace(): ColorSpace {
    if (this.isLocalStorageAvailable) {
      const colorSpaceJson = window.localStorage.getItem(this.storageKey);
      return colorSpaceJson ? JSON.parse(colorSpaceJson) : ColorSpace.oklch;
    }
    return ColorSpace.oklch;
  }
  getColors(): Color[] {
    if (this.isLocalStorageAvailable) {
      const colorsJson = window.localStorage.getItem(this.storageKey);
      return colorsJson ? JSON.parse(colorsJson) : [];
    }
    return [];
  }

  setColors(colors: Color[]): void {
    if (this.isLocalStorageAvailable) {
      window.localStorage.setItem(this.storageKey, JSON.stringify(colors));
    }
  }
  setGamut(gamut: GamutType): void {
    if (this.isLocalStorageAvailable) {
      window.localStorage.setItem(this.storageKey, gamut);
    }
  }
  setColorSpace(colorSpace: ColorSpace): void {
    if (this.isLocalStorageAvailable) {
      window.localStorage.setItem(this.storageKey, colorSpace);
    }
  }
}
