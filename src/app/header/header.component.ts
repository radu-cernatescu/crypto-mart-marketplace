import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { TokenStorageService } from '../token-storage.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  user: User;
  notifications: any[] = [];
  unreadNotifs: boolean = false;

  constructor(private tokenStorageService: TokenStorageService,
    private userService: UserService) { 
    this.user = this.tokenStorageService.getUser();
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.userService.getListingDeleteNotif(this.user).subscribe((res: any) => {
      console.log(res)

      this.notifications = res.notifications;

      let unreadCounter = 0;
      for (let notif of this.notifications) {
        if (notif.unread == true) {
          unreadCounter++;
        }
      }
      if (unreadCounter > 0) {
        this.unreadNotifs = true;
      }
      else {
        this.unreadNotifs = false;
      }
    });
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.replace('/main');
  }

}
