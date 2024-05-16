import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddColorsComponent } from './components/add-colors/add-colors.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddColorsComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-color';
}
