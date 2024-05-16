import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storageKey = 'colors';
  private isLocalStorageAvailable: boolean;

  constructor() {
    this.isLocalStorageAvailable =
      typeof window !== 'undefined' && !!window.localStorage;
  }

  getColors(): any[] {
    if (this.isLocalStorageAvailable) {
      const colorsJson = window.localStorage.getItem(this.storageKey);
      return colorsJson ? JSON.parse(colorsJson) : [];
    }
    return [];
  }

  setColors(colors: any[]): void {
    if (this.isLocalStorageAvailable) {
      window.localStorage.setItem(this.storageKey, JSON.stringify(colors));
    }
  }
}
