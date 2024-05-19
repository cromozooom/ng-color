import { Injectable } from '@angular/core';
import { Palette, GamutType, PaletteSpace } from '../models/palette.model';
import { LocalStorageService } from './local-storage.service';
import { v4 as uuidv4 } from 'uuid';

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
      (paletteData) => new Palette(paletteData.source, paletteData.name)
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
    palette.id = uuidv4();
    this._palettes.push(palette);
    this.savePalettes();
  }

  savePalettes(): void {
    const paletteData = this.palettes.map((palette) => ({
      source: palette.source,
      name: palette.name,
      gamut: palette.gamut,
      space: palette.space,
      stepper: palette.stepper,
      id: uuidv4(),
    }));
    this.localStorageService.setPalettes(paletteData);
  }

  removePalette(index: number) {
    this._palettes.splice(index, 1);
    this.savePalettes();
  }
}
