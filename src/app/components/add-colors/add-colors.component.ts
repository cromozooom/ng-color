import { Component } from '@angular/core';
import { ColorStateService } from './../../services/color-state-service.service';
import { ColorsService } from './../../services/colors.service';
import { Color } from '../../models/color.model';
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
  newColor: Color = new Color('', '', '', '', 1); // Initialize a new Color object
  private _colors: Color[] = [];

  constructor(
    private colorsService: ColorsService,
    private colorStateService: ColorStateService
  ) {
    this._colors = this.colorsService.colors;
    this.colorStateService.saveState([...this.colorsService.colors]);
  }

  get colors(): Color[] {
    return [...this._colors];
  }

  undo() {
    const previousState = this.colorStateService.undo();
    if (previousState) {
      this.colorsService.colors = [...previousState];
      this.colorsService.saveColors();
      this._colors = this.colorsService.colors;
    }
  }

  redo() {
    const nextState = this.colorStateService.redo();
    if (nextState) {
      this.colorsService.colors = [...nextState];
      this.colorsService.saveColors();
      this._colors = this.colorsService.colors;
    }
  }

  addColor() {
    if (this.newColor.source) {
      this.colorsService.addColor(this.newColor); // Add the new color using the service method
      this.newColor = new Color('', '', '', '', 1); // Reset the newColor object
    }
    this.colorStateService.saveState([...this.colorsService.colors]);
  }
}
