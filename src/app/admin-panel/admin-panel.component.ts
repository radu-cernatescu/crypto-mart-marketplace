import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  users : {firstName:string,
    lastName: string,
    email: string,
    isblock : boolean}[] = [
  ]
  constructor(private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((res =>{
      this.users = res.data;
    }))
  }
  /** function to delete user by admin  */
  deleteUser(user:any){
    this.userService.deleteUser(user).subscribe((res =>{
      alert(res.message);
      window.location.reload();
    }))
  }
  /** function to block/unblock user by admin based on previous status */
  blockUser(user:any){
    this.userService.blockUser(user).subscribe((res =>{
      alert(res.message);
      window.location.reload();
    }))

  }

}