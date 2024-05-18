import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AddPalettesComponent } from './components/add-palettes/add-palettes.component';

@NgModule({
  declarations: [AppComponent, AddPalettesComponent],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule, // Add RouterModule to imports
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
