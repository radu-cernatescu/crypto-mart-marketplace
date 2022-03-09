import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((res =>{
      this.users = res.data;
    }))
  }
  /** function to delete user by admin  */
  deleteUser(user:any){
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
    this.userService.blockUser(user).subscribe(((res: any) =>{
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