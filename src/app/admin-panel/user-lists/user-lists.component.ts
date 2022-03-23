import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { ItemsService } from 'src/app/items.service';

@Component({
  selector: 'app-user-lists',
  templateUrl: './user-lists.component.html',
  styleUrls: ['./user-lists.component.css']
})
export class UserListsComponent implements OnInit {

  userItems : {title: string,
  description: string,
  images: []
  price: string}[] = [];
  user:any;
  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private ItemsService: ItemsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) =>{
      let userId = params.get('email');
      this.loadUserItem(userId);
    })
  }
  /** function to load items by admin of selected user */
  loadUserItem(userId:any){
    this.userService.getUserItems(userId).subscribe((res =>{
      this.userItems = [];
      res.data.forEach((element: any) => {
        if (element.userId == res.user._id) {
          this.userItems.push(element);
        }
      });
      this.user = res.user;
    }))
  }
/** function to delete items by admin of selected user */
  deleteItem(item:any){
    let reason :any;
    reason = prompt("What is the reason for removal?", "Breach of TOS.");
    if (reason == "" || reason == null) {
      reason = "Breach of TOS.";
    }
    this.userService.sendListingDeleteNotif(this.user, item, reason).subscribe((res: any) => {
      //console.log(res)
      if (res.message == "SUCCESS") {
        this.ItemsService.deleteUserItem(this.user, item).subscribe(
          (res: any) => {
            if (res.message == "SUCCESS") {
              alert("Item deleted successfully");
              window.location.reload();
            }
          }
        );
      }
    });
  }
}