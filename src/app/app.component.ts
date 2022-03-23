import { Component, ViewEncapsulation } from '@angular/core';
import { fadeAnimation } from './animations';
import { TokenStorageService } from './token-storage.service';
import { User } from './User';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'Group15';
  user: User;

  constructor(private userService: UserService, private tokenStorage: TokenStorageService) {
    this.user = this.tokenStorage.getUser();
    let hey = function (userService: any, user: User, tokenStorage: any) {
      userService.checkUserBan(user).subscribe((res: any) => {
        if (res.isBlock) {
          alert(`Your account has been banned:\n${res.user.reason}`);
          tokenStorage.signOut();
          window.location.reload();
        }
      });
    }
    setInterval(hey, 5000, this.userService, this.user, this.tokenStorage);
  }
}