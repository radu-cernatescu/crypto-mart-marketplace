import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';
import { User } from '../User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService/*, private itemService: ItemsService*/) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((res =>{
      // get only regular users
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].type == 'regular') {
          this.users.push(res.data[i]);
        }
      }
    }))
  }
  /** function to delete user by admin  */
  deleteUser(user: User){
    /* delete all user's items (TO DO)
    this.userService.getUserItems(user.email).subscribe(res => {
      console.log(res.data);
      let items = res.data;
      
      for (let i = 0; i < items.length; i++) {
        this.itemService.deleteUserItem(res.user,items[i]);
      }
      
      
    });
    */
    this.userService.deleteUser(user).subscribe((res =>{
      if (res.message == "SUCCESS") {
        alert("Sucessfully deleted user!");
      }
      else {
        alert("Error deleting user!");
      }
      window.location.reload();
    }))
  }
  /** function to block/unblock user by admin based on previous status */
  blockUser(user:any){
    let reason: any = "Breach of TOS.";
    if (!user.isBlock) {
      reason = prompt("What is the reason for ban?", "Breach of TOS.");
    }
    else {
      reason = "";
    }
    this.userService.blockUser(user, reason).subscribe(((res: any) =>{
      if (res.message == "SUCCESS") {
        if (!user.isBlock) {
          alert("Sucessfully blocked user!");
        }
        else {
          alert("Sucessfully unblocked user!");
        }
      }
      else {
        alert("Error blocking/unblocking user!");
      }
      window.location.reload();
    }))

  }

}