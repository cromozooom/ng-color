import { Component } from '@angular/core';
import { ColorStateService } from './../../services/color-state-service.service';
import { ColorsService } from './../../services/colors.service';
import { Color, GamutType, ColorSpace } from '../../models/color.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-colors',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-colors.component.html',
  styleUrl: './add-colors.component.scss',
})
export class AddColorsComponent {
  newColor: Color = new Color('', '');
  currentColorSpace: ColorSpace; // Initialize a new Color object
  currentGamut: GamutType; // Initialize a new Color object

  private _colors: Color[] = [];
  private _gamut: GamutType;
  private _space: ColorSpace;

  constructor(
    private colorsService: ColorsService,
    private colorStateService: ColorStateService
  ) {
    this._colors = this.colorsService.colors;
    this._gamut = this.colorsService.gamut;
    this._space = this.colorsService.colorSpace;
    this.colorStateService.saveState({
      colors: this._colors,
      gamut: this._gamut,
      space: this._space,
    });

    this.currentColorSpace = this._space;
    this.currentGamut = this._gamut;
  }

  get colors(): Color[] {
    return [...this._colors];
  }

  undo() {
    const previousState = this.colorStateService.undo();
    if (previousState) {
      this.colorsService.colors = [...previousState.colors]; // Spread only the 'colors' property
      this.colorsService.saveColors();
      this._colors = this.colorsService.colors;
    }
  }

  redo() {
    const nextState = this.colorStateService.redo();
    if (nextState) {
      this.colorsService.colors = nextState.colors; // Assign the 'colors' property directly
      this.colorsService.saveColors();
      this._colors = this.colorsService.colors;
    }
  }

  addColor() {
    if (this.newColor.source) {
      this.newColor.gamut = this._gamut; // Call getGamut() method on the current instance
      this.newColor.space = this._space; // Call getGamut() method on the current instance
      this.colorsService.addColor(this.newColor); // Add the new color using the service method
      this.newColor = new Color('', ''); // Reset the newColor object
    }
    this.colorStateService.saveState({
      colors: this._colors,
      gamut: this._gamut,
      space: this._space,
    });
  }

  removeColor(i: number) {
    this.colorsService.removeColor(i); // Add the new color using the service method
    this.colorStateService.saveState({
      colors: this._colors,
      gamut: this._gamut,
      space: this._space,
    });
  }
}
