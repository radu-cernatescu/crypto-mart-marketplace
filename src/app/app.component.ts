import { Component, ViewEncapsulation } from '@angular/core';
import { fadeAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'Group15';
}