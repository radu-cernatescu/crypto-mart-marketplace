import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/token-storage.service';
import { User } from 'src/app/User';
import { ItemsService } from '../../items.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  myOrders : any = [];
  user: User;

  constructor(private itemsService: ItemsService, private tokenService: TokenStorageService) {
    this.user = this.tokenService.getUser();
  }

  ngOnInit(): void {
    this.itemsService.getUserOrders(this.user).subscribe((res: any) => {/*console.log(res);*/ this.myOrders =  res.orders;});
  }

}
