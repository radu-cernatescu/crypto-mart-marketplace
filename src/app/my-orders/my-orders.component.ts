import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  myOrders : any = []
  fiveDayLetter!: Date;
  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
    this.myOrders =  this.itemsService.boughtItem;
    let today = new Date();
    this.fiveDayLetter = new Date(today);
    this.fiveDayLetter.setDate(today.getDate()+5);
    console.log(this.myOrders)
  }

}
