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
    this.userItems[index].quantity = Math.round(Number(event.target.value));
    let numberCounter = document.getElementById("userIn");
    if (numberCounter) {
        numberCounter.innerHTML = "" + this.userItems[index].quantity;
    }
    if(event.target.value < 1){
      this.userItems[index].quantity = 1;
    } else {
      this.itemsService.editItemQuantity(this.userItems[index]).subscribe((message:any) => {/*console.log(message);*/});
    }
    this.loadItems();
  }
  buyNow(){
    this.itemsService.checkoutCart(this.userItems).subscribe((message:any) => {console.log(message)});
    this.itemsService.clearCart(this.userItems).subscribe((message:any) => {console.log(message)});
   // TO DO 
   // API for wallet balance prior to order
   // API For wallet balance after order
   // API for transaction ID 
   // OR you can get all these details i the response of checkoutCart API call at line number 64
    let userChoices = document.getElementById("walletDetailPopup");
    let notUserChoices = document.getElementById("checkoutPopup");
    this.visibilityToggle(userChoices, notUserChoices);
  }
  ok(){
    //window.location.reload();
  }
  visibilityToggle(userChoice : any, notUserChoice : any) {
    if (notUserChoice) {
      notUserChoice.style.visibility = "hidden";
      notUserChoice.style.animation = "none";
      notUserChoice.style.animationDuration = "0ms";
    }
    if (userChoice) {
      userChoice.style.visibility = "visible";
      userChoice.style.animation = "popupHighlight";
      userChoice.style.animationDuration = "1500ms";
    }
  }
  checkoutPop() {
    let userChoices = document.getElementById("checkoutPopup");
    let notUserChoices = document.getElementById("checkOutMenu");
    this.visibilityToggle(userChoices, notUserChoices);
  }
  cancelCheckout() {
    let userChoices = document.getElementById("checkOutMenu");
    let notUserChoices = document.getElementById("checkoutPopup");
    this.visibilityToggle(userChoices, notUserChoices);
  }
}
