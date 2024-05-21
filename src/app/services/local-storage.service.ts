import { Injectable } from '@angular/core';
import { Palette, GamutType, PaletteSpace } from '../models/palette.model';
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private stepperStorageKey = 'stepper';
  private paletteIdStorageKey = 'id';
  private gamutStorageKey = 'gamut';
  private palettesStorageKey = 'palettes';
  private colorSpaceStorageKey = 'colorSpace';

  private isLocalStorageAvailable: boolean;

  constructor() {
    this.isLocalStorageAvailable =
      typeof window !== 'undefined' && !!window.localStorage;

    if (
      this.isLocalStorageAvailable &&
      !window.localStorage.getItem(this.stepperStorageKey)
    ) {
      this.setStepper(12); // Initialize with a default value
    }

    if (
      this.isLocalStorageAvailable &&
      !window.localStorage.getItem(this.gamutStorageKey)
    ) {
      this.setGamut(GamutType.sRGB); // Ensure initial gamut value is set
    }
    if (
      this.isLocalStorageAvailable &&
      !window.localStorage.getItem(this.colorSpaceStorageKey)
    ) {
      this.setPaletteSpace(PaletteSpace.oklch); // Ensure initial palette space value is set
    }
  }

  getGamut(): GamutType {
    if (this.isLocalStorageAvailable) {
      const gamutJson = window.localStorage.getItem(this.gamutStorageKey);
      return gamutJson ? JSON.parse(gamutJson) : GamutType.sRGB;
    }
    return GamutType.sRGB;
  }

  getStepper(): number {
    if (this.isLocalStorageAvailable) {
      const stepper = window.localStorage.getItem(this.stepperStorageKey);
      return stepper ? parseInt(stepper, 10) : 12; // Parse string to number or return default value
    }
    return 12; // Return default value if local storage is not available
  }

  getPaletteSpace(): PaletteSpace {
    if (this.isLocalStorageAvailable) {
      const paletteSpaceJson = window.localStorage.getItem(
        this.colorSpaceStorageKey
      );
      return paletteSpaceJson
        ? JSON.parse(paletteSpaceJson)
        : PaletteSpace.oklch;
    }
    return PaletteSpace.oklch;
  }
  getPalettes(): Palette[] {
    if (this.isLocalStorageAvailable) {
      const palettesJson = window.localStorage.getItem(this.palettesStorageKey);
      return palettesJson ? JSON.parse(palettesJson) : [];
    }
    return [];
  }

  setPaletteId(paletteId: string): void {
    if (this.isLocalStorageAvailable) {
      window.localStorage.setItem(this.paletteIdStorageKey, paletteId);
    }
  }

  setGamut(gamut: GamutType): void {
    if (this.isLocalStorageAvailable) {
      window.localStorage.setItem(this.gamutStorageKey, JSON.stringify(gamut));
    }
  }
  setStepper(stepper: number): void {
    if (this.isLocalStorageAvailable) {
      window.localStorage.setItem(
        this.stepperStorageKey,
        JSON.stringify(stepper)
      );
    }
  }

  setPaletteSpace(paletteSpace: PaletteSpace): void {
    if (this.isLocalStorageAvailable) {
      window.localStorage.setItem(
        this.colorSpaceStorageKey,
        JSON.stringify(paletteSpace)
      );
    }
  }

  setPalettes(palettes: Palette[]): void {
    if (this.isLocalStorageAvailable) {
      window.localStorage.setItem(
        this.palettesStorageKey,
        JSON.stringify(palettes)
      );
    }
  }
}
