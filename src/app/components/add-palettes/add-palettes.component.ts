import { Component } from '@angular/core';
import { PaletteStateService } from './../../services/palette-state-service.service';
import { PalettesService } from './../../services/palettes.service';
import { Palette, GamutType, PaletteSpace } from '../../models/palette.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { LocalStorageService } from '../../services/local-storage.service';
import Color from 'colorjs.io/types/src';
@Component({
  selector: 'app-add-palettes',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-palettes.component.html',
  styleUrl: './add-palettes.component.scss',
})
export class AddPalettesComponent {
  source: string = '';
  newPalette: Palette = {} as Palette;
  currentStepper: number; // Initialize a new Palette object
  currentPaletteSpace: PaletteSpace; // Initialize a new Palette object
  currentGamut: GamutType; // Initialize a new Palette object

  private _palettes: Palette[] = [];
  private _gamut: GamutType;
  private _space: PaletteSpace;
  private _stepper: number;

  constructor(
    private palettesService: PalettesService,
    private paletteStateService: PaletteStateService,
    localStorageService: LocalStorageService
  ) {
    this._palettes = this.palettesService.palettes;
    this._stepper = this.palettesService.stepper;
    this._gamut = this.palettesService.gamut;
    this._space = this.palettesService.paletteSpace;
    this.paletteStateService.saveState({
      palettes: this._palettes,
      gamut: this._gamut,
      space: this._space,
      stepper: this._stepper,
    });

    this.currentStepper = this._stepper;
    this.currentPaletteSpace = this._space;
    this.currentGamut = this._gamut;
  }

  get palettes(): Palette[] {
    return [...this._palettes];
  }

  xgetColorStyle(color: any): any {
    // Convert color object to CSS color value
    const cssColor = `oklch(${color.coords.join(',')})`;
    return { 'background-color': cssColor };
  }

  getColorStyle(color: any): any {
    // Convert color object to CSS color value with higher precision
    const cssColor = `oklch(${color.coords[0]}, ${color.coords[1]}, ${color.coords[2]})`;

    return { 'background-color': cssColor };
  }

  updateShade(palettes: any, shadeIndex: number): void {
    // const updatedShade = palette.shades[shadeIndex];
    // const updatedColor = new Color(`oklch(${updatedShade.coords.join(' ')})`);
    // palette.shades[shadeIndex] = updatedColor;
    this.palettesService.savePalettes();
    this.paletteStateService.saveState({
      palettes: this._palettes,
      gamut: this._gamut,
      space: this._space,
      stepper: this._stepper,
    });
  }

  undo() {
    const previousState = this.paletteStateService.undo();
    if (previousState) {
      this.palettesService.palettes = [...previousState.palettes];
      this.palettesService.savePalettes();
      this._palettes = this.palettesService.palettes;
    }
  }

  redo() {
    const nextState = this.paletteStateService.redo();
    if (nextState) {
      this.palettesService.palettes = nextState.palettes;
      this.palettesService.savePalettes();
      this._palettes = this.palettesService.palettes;
    }
  }

  addPalette() {
    console.log(this.source);
    let newPalette: Palette = {} as Palette;
    const paletteId = uuidv4();
    newPalette.shades = this.palettesService.generateStepper(
      this.source,
      this.currentStepper,
      this.currentPaletteSpace,
      this.currentGamut
    );

    // console.log(this.newPalette);
    newPalette = new Palette(
      this.source,
      '',
      this.currentGamut,
      this.currentPaletteSpace,
      newPalette.stepper,
      newPalette.shades,
      paletteId
    );
    this.palettesService.addPalette(newPalette);

    this.paletteStateService.saveState({
      palettes: this._palettes,
      gamut: this._gamut,
      space: this._space,
      stepper: this._stepper,
    });
  }

  removePalette(i: number) {
    this.palettesService.removePalette(i);
    this.paletteStateService.saveState({
      palettes: this._palettes,
      gamut: this._gamut,
      space: this._space,
      stepper: this._stepper,
    });
  }
}
