import { Component } from '@angular/core';
import { UserService } from 'src/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Group15';

  constructor(service: UserService) {

  }
}
