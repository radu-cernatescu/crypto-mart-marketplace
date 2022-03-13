import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  userItems : any;
  subTotal: number = 0;
  grandTotal: number = 0;
  tax: number = 0;
  numOfItems: number = 0;
  fiveDayLetter!: Date;

  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {
    let today = new Date();
    this.fiveDayLetter = new Date(today);
    this.fiveDayLetter.setDate(today.getDate()+5);
    this.userItems = [];
    this.itemsService.getUserCartItems().subscribe((res:any)=> {this.userItems = res.cart; this.loadItems();})
  }


  deleteItemFromCart(i:number){
    this.itemsService.deleteItemFromCart(this.userItems[i]).subscribe((message:any) => {/*console.log(message)*/})
    this.loadItems();
    location.reload();
  }


  loadItems() {
    let items = 0;
    let amount = 0;
    if (this.userItems) {
      for(let i=0; i < this.userItems.length; i++){
        items +=  this.userItems[i].quantity;
        amount +=  this.userItems[i].quantity * this.userItems[i].price;
      }
    }

    this.numOfItems = items;
    this.subTotal = amount;
    this.tax = +(amount * 0.13).toFixed(2);
    this.grandTotal = +(amount + this.tax).toFixed(2);
  }


  quantityChange(event: any, index: number){
    this.userItems[index].quantity = Number(event.target.value);
    if(event.target.value < 1){
      this.userItems[index].quantity = 1;
    } else {
      this.itemsService.editItemQuantity(this.userItems[index]).subscribe((message:any) => {/*console.log(message);*/});
    }
    this.loadItems();
  }
  buyNow(){
    this.userItems.forEach((element: { userId: any; title: any; description: any; price: any; images: any; color: any; size: any; firstName: any; shippingOption: any; itemId: any; quantity: any; }) => {
      const item: any = {
        userId : element.userId,
        title : element.title,
        description : element.description,
        price : element.price,
        images : element.images, // adding all images if needed you can add single images as well.
        color : element.color,
        size : element.size,
        firstName : element.firstName,
        shippingOption: element.shippingOption,
        itemId: element.itemId,
        quantity : element.quantity,
        time: new Date()
      };
      this.itemsService.buyItem(item)
      this.itemsService.deleteItemFromCart(element).subscribe((message:any) => {/*console.log(message)*/})
    });
  }

}
