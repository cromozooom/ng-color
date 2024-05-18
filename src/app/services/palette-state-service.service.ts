import { Injectable } from '@angular/core';
import { Palette, PaletteSpace, GamutType } from '../models/palette.model';

@Injectable({
  providedIn: 'root',
})
export class PaletteStateService {
  private states: {
    palettes: Palette[];
    gamut: GamutType;
    space: PaletteSpace;
  }[] = [];
  private currentIndex = -1; // Index of the current state
  private maxUndoSteps = 10; // Maximum number of undo steps allowed

  saveState(state: {
    palettes: Palette[];
    gamut: GamutType;
    space: PaletteSpace;
  }) {
    // Truncate the states array if we've gone past the maximum undo steps
    if (this.currentIndex + 1 >= this.maxUndoSteps) {
      this.states = this.states.slice(-this.maxUndoSteps + 1);
      this.currentIndex = this.maxUndoSteps - 1;
    }

    // If we're undoing, remove the future states
    this.states = this.states.slice(0, this.currentIndex + 1);

    // Add the new state
    this.states.push({
      palettes: [...state.palettes],
      gamut: state.gamut,
      space: state.space,
    }); // Spread palettes array and assign gamut
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
