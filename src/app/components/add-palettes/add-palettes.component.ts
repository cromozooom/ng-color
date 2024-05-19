import { Component } from '@angular/core';
import { PaletteStateService } from './../../services/palette-state-service.service';
import { PalettesService } from './../../services/palettes.service';
import { Palette, GamutType, PaletteSpace } from '../../models/palette.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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
      this.palettesService.palettes = [...previousState.palettes]; // Spread only the 'palettes' property
      this.palettesService.savePalettes();
      this._palettes = this.palettesService.palettes;
    }
  }

  redo() {
    const nextState = this.paletteStateService.redo();
    if (nextState) {
      this.palettesService.palettes = nextState.palettes; // Assign the 'palettes' property directly
      this.palettesService.savePalettes();
      this._palettes = this.palettesService.palettes;
    }
  }

  addPalette() {
    console.log(this.newPalette.source);
    if (this.newPalette.source) {
      this.newPalette.gamut = this._gamut; // Call getGamut() method on the current instance
      this.newPalette.space = this._space; // Call getGamut() method on the current instance
      this.palettesService.addPalette(this.newPalette); // Add the new palette using the service method
      this.newPalette = new Palette('', ''); // Reset the newPalette object
    }
    this.paletteStateService.saveState({
      palettes: this._palettes,
      gamut: this._gamut,
      space: this._space,
    });
  }

  removePalette(i: number) {
    this.palettesService.removePalette(i); // Add the new palette using the service method
    this.paletteStateService.saveState({
      palettes: this._palettes,
      gamut: this._gamut,
      space: this._space,
    });
  }
}
