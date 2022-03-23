import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/Item';
import { TokenStorageService } from 'src/app/token-storage.service';
import { User } from 'src/app/User';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-my-inbox',
  templateUrl: './my-inbox.component.html',
  styleUrls: ['./my-inbox.component.css']
})
export class MyInboxComponent implements OnInit {
  userItems: any[] = [];
  user: User;

  constructor(private userService: UserService,
    private tokenStorage: TokenStorageService) { 
    this.user = this.tokenStorage.getUser();
  }

  ngOnInit(): void {
    this.userService.getListingDeleteNotif(this.user).subscribe((res: any) => {
      //console.log(res);

      this.userItems = res.notifications;
    });
  }

  markAsRead(item: Item) {
    console.log("marking as read")
    this.userService.markReadListingDeleteNotif(this.user, item).subscribe((res:any) => {
      //console.log(res);
      window.location.reload();
    });
  }

}
