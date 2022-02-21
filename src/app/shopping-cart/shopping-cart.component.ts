import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemsService } from '../items.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  userIems : any;
  subPrice: number = 0;
  tax = 0;
  totlItems: number = 0;
  finalPrice = 0;
  fiveDayLetter!: Date;

  constructor(private itemsService: ItemsService,
    private readonly userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    let today = new Date();
    this.fiveDayLetter = new Date(today);
    this.fiveDayLetter.setDate(today.getDate()+5);
    this.userIems = [];
    console.log(this.itemsService.getUserCartItem());
    this.loadItems();
  }
  deleteItemFromCart(i:number){
    this.itemsService.deleteItemFromCart(i)
    this.loadItems();
  }
  loadItems(){
    this.userIems = [];
    this.userIems = this.itemsService.getUserCartItem();
    let items = 0;
    let amount = 0;
    for(let i=0; i < this.userIems.length; i++){
      items +=  this.userIems[i].quantity;
      amount +=  this.userIems[i].quantity * this.userIems[i].price;
    }
    this.totlItems = items;
    this.subPrice = amount;
    this.tax = +(amount * 0.13).toFixed(2);
    this.finalPrice = +(amount + this.tax).toFixed(2);

  }
  quantityChange(event: any, index: number){
    console.log(event.target.value);
    // if(event.target.value < 1){
    //   this.userIems[index].quantity = 1;
    // }
    this.loadItems();
  }

}
