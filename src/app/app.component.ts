import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddPalettesComponent } from './components/add-palettes/add-palettes.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddPalettesComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-palette';
}
