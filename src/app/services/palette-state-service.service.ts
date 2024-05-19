import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // Import isPlatformBrowser
import { Palette, PaletteSpace, GamutType } from '../models/palette.model';

@Injectable({
  providedIn: 'root',
})
export class PaletteStateService {
  private readonly STORAGE_KEY = 'palette_state'; // Key for storing state data in local storage
  private states: {
    palettes: Palette[];
    gamut: GamutType;
    space: PaletteSpace;
    stepper: number;
  }[] = [];
  private currentIndex = -1; // Index of the current state
  private maxUndoSteps = 10; // Maximum number of undo steps allowed

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Inject PLATFORM_ID
    if (isPlatformBrowser(this.platformId)) {
      // Check if running in browser context
      // Load state data from local storage when the service is initialized
      const savedState = localStorage.getItem(this.STORAGE_KEY);
      if (savedState) {
        this.states = JSON.parse(savedState);
        this.currentIndex = this.states.length - 1;
      }
    }
  }

  saveState(state: {
    palettes: Palette[];
    gamut: GamutType;
    space: PaletteSpace;
    stepper: number;
  }) {
    if (isPlatformBrowser(this.platformId)) {
      // Check if running in browser context
      // Truncate the states array if we've gone past the maximum undo steps
      if (this.currentIndex + 1 >= this.maxUndoSteps) {
        this.states = this.states.slice(-this.maxUndoSteps + 1);
        this.currentIndex = this.maxUndoSteps - 1;
      }

      // If we're undoing, remove the future states
      this.states = this.states.slice(0, this.currentIndex + 1);

      // Check if the new state is different from the current state
      const currentState = this.states[this.currentIndex];
      if (!this.areStatesEqual(currentState, state)) {
        // Add the new state
        this.states.push({
          palettes: [...state.palettes],
          gamut: state.gamut,
          space: state.space,
          stepper: state.stepper,
        });
        this.currentIndex++;

        // Save the updated state data to local storage
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.states));
      }
    }
  }

  private areStatesEqual(state1: any, state2: any): boolean {
    // Perform deep equality check between state1 and state2
    // Example: Compare each property of the states
    // You may need to implement this logic based on your specific state structure
    // For simplicity, this example assumes shallow comparison
    return JSON.stringify(state1) === JSON.stringify(state2);
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
