import { Injectable } from '@angular/core';
import { Palette, GamutType, PaletteSpace } from '../models/palette.model';
import { LocalStorageService } from './local-storage.service';
import Color from 'colorjs.io';

@Injectable({
  providedIn: 'root',
})
export class PalettesService {
  private _palettes: Palette[] = [];
  private _stepper: number = 12;
  private _gamut: GamutType = GamutType.sRGB;
  private _paletteSpace: PaletteSpace = PaletteSpace.oklch;

  constructor(private localStorageService: LocalStorageService) {
    const palettesData = this.localStorageService.getPalettes();
    const stepperData = this.localStorageService.getStepper();
    const gamutData = this.localStorageService.getGamut();
    const paletteSpaceData = this.localStorageService.getPaletteSpace();

    this._gamut = gamutData;
    this._stepper = stepperData;
    this._paletteSpace = paletteSpaceData;
    this._palettes = palettesData.map(
      (paletteData) =>
        new Palette(
          paletteData.source,
          paletteData.name,
          paletteData.gamut,
          paletteData.space,
          paletteData.stepper,
          paletteData.shades,
          paletteData.id
        )
    );
  }

  get gamut(): GamutType {
    return this._gamut;
  }
  get paletteSpace(): PaletteSpace {
    return this._paletteSpace;
  }
  get stepper(): number {
    return this._stepper;
  }
  get palettes(): Palette[] {
    return this._palettes;
  }
  set palettes(newPalettes: Palette[]) {
    this._palettes = newPalettes;
  }

  addPalette(palette: Palette): void {
    this._palettes.push(palette);
    console.log(this._palettes);
    this.savePalettes();
  }

  savePalettes(): void {
    const paletteData = this.palettes.map((palette) => ({
      source: palette.source,
      name: palette.name,
      gamut: palette.gamut,
      space: palette.space,
      stepper: palette.stepper,
      shades: palette.shades,
      id: palette.id,
    }));

    this.localStorageService.setPalettes(paletteData);
  }

  removePalette(index: number) {
    this._palettes.splice(index, 1);
    this.savePalettes();
  }

  generateStepper(
    source: string,
    stepper: number,
    paletteSpace: PaletteSpace,
    gamut: GamutType
  ): Color[] {
    const baseColor = new Color(source).to(paletteSpace).to('oklch');
    const shades: Color[] = [];
    const stepSize = (0.999 - 0.2) / (stepper - 1);

    for (let i = 0; i < stepper; i++) {
      const lightness = 0.999 - i * stepSize;
      const shade = baseColor.clone().set('l', lightness);
      const shadeLCH = shade;
      shades.push(shadeLCH);
    }
    return shades;
  }
}
