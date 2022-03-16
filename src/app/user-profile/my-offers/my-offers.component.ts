import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/items.service';
import { TokenStorageService } from 'src/app/token-storage.service';
import { User } from 'src/app/User';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent implements OnInit {

  myOffers : any = [];
  user: User;

  constructor(private itemsService: ItemsService, private tokenService: TokenStorageService,
    private userService: UserService) {
    this.user = this.tokenService.getUser();
  }

  ngOnInit(): void {
    this.userService.getUserItems(this.user).subscribe((res: any) => {
      this.itemsService.getOrders().subscribe((res1: any) => {
        let userItems = res.data;
        let orders = res1.orders;

        for (let i = 0; i < orders.length; i++) {
          
          if (orders.includes(userItems[i]._id)) {
            this.myOffers.push(orders[i]);
          }
        }
      });
    });
  }

}
