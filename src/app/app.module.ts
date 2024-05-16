import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AddColorsComponent } from './components/add-colors/add-colors.component';

@NgModule({
  declarations: [AppComponent, AddColorsComponent],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule, // Add RouterModule to imports
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
