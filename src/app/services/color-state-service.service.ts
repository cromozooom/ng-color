import { Injectable } from '@angular/core';
import { Color, ColorSpace, GamutType } from '../models/color.model';

@Injectable({
  providedIn: 'root',
})
export class ColorStateService {
  private states: { colors: Color[]; gamut: GamutType; space: ColorSpace }[] =
    [];
  private currentIndex = -1; // Index of the current state
  private maxUndoSteps = 10; // Maximum number of undo steps allowed

  saveState(state: { colors: Color[]; gamut: GamutType; space: ColorSpace }) {
    // Truncate the states array if we've gone past the maximum undo steps
    if (this.currentIndex + 1 >= this.maxUndoSteps) {
      this.states = this.states.slice(-this.maxUndoSteps + 1);
      this.currentIndex = this.maxUndoSteps - 1;
    }

    // If we're undoing, remove the future states
    this.states = this.states.slice(0, this.currentIndex + 1);

    // Add the new state
    this.states.push({
      colors: [...state.colors],
      gamut: state.gamut,
      space: state.space,
    }); // Spread colors array and assign gamut
    this.currentIndex++;
  }

  undo() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.states[this.currentIndex];
    }
    return null;
  }

  redo() {
    if (this.currentIndex < this.states.length - 1) {
      this.currentIndex++;
      return this.states[this.currentIndex];
    }
    return null;
  }
}
