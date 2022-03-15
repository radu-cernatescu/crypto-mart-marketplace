import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  myOrders : any = []
  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
    this.myOrders =  this.itemsService.boughtItem;
    console.log(this.myOrders)
  }

}
