import { Component } from '@angular/core';
import { PaletteStateService } from './../../services/palette-state-service.service';
import { PalettesService } from './../../services/palettes.service';
import { Palette, GamutType, PaletteSpace } from '../../models/palette.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-add-palettes',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-palettes.component.html',
  styleUrl: './add-palettes.component.scss',
})
export class AddPalettesComponent {
  newPalette: Palette = new Palette('', '');
  currentStepper: number; // Initialize a new Palette object
  currentPaletteSpace: PaletteSpace; // Initialize a new Palette object
  currentGamut: GamutType; // Initialize a new Palette object

  private _palettes: Palette[] = [];
  private _gamut: GamutType;
  private _space: PaletteSpace;
  private _stepper: number;

  constructor(
    private palettesService: PalettesService,
    private paletteStateService: PaletteStateService
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
    console.log(this.newPalette.source);
    if (this.newPalette.source) {
      this.newPalette.gamut = this._gamut;
      this.newPalette.space = this._space;
      const paletteId = uuidv4();
      this.newPalette.id = paletteId;
      this.palettesService.addPalette(this.newPalette);

      const storedPaletteIds = JSON.parse(
        localStorage.getItem('paletteIds') ?? '[]'
      );
      storedPaletteIds.push(paletteId);
      localStorage.setItem('paletteIds', JSON.stringify(storedPaletteIds));

      this.newPalette = new Palette('', '');
    }
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
