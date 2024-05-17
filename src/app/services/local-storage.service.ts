import { Injectable } from '@angular/core';
import { Palette, GamutType, PaletteSpace } from '../models/palette.model';
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storageKey = 'palettes';
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
  getPaletteSpace(): PaletteSpace {
    if (this.isLocalStorageAvailable) {
      const paletteSpaceJson = window.localStorage.getItem(this.storageKey);
      return paletteSpaceJson
        ? JSON.parse(paletteSpaceJson)
        : PaletteSpace.oklch;
    }
    return PaletteSpace.oklch;
  }
  getPalettes(): Palette[] {
    if (this.isLocalStorageAvailable) {
      const palettesJson = window.localStorage.getItem(this.storageKey);
      return palettesJson ? JSON.parse(palettesJson) : [];
    }
    return [];
  }

  setPalettes(palettes: Palette[]): void {
    if (this.isLocalStorageAvailable) {
      window.localStorage.setItem(this.storageKey, JSON.stringify(palettes));
    }
  }
  setGamut(gamut: GamutType): void {
    if (this.isLocalStorageAvailable) {
      window.localStorage.setItem(this.storageKey, gamut);
    }
  }
  setPaletteSpace(paletteSpace: PaletteSpace): void {
    if (this.isLocalStorageAvailable) {
      window.localStorage.setItem(this.storageKey, paletteSpace);
    }
  }
}
