import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CryptoService } from '../crypto.service';
import { ItemsService } from '../items.service';
import { TokenStorageService } from '../token-storage.service';
import { User } from '../User';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  user: User;
  userItems : any;
  subTotal: number = 0;
  grandTotal: number = 0;
  tax: number = 0;
  numOfItems: number = 0;
  fiveDayLetter!: Date;
  current_rate: any;

  xmrGrandTotal: number = 0;
  grantTotalDollars: number = 0;
  priorBalance: number = 0;
  afterBalance: number = 0;
  totalFee: number = 0;

  constructor(private itemsService: ItemsService,
    private tokenService: TokenStorageService, private cryptoService: CryptoService,
    private spinnerService: NgxSpinnerService) {
      this.user = this.tokenService.getUser();

      this.cryptoService.getXMRrate().subscribe((res: any) => {
        this.current_rate = res.data.data.monero.cad;
      });
    }

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
    this.tax = (this.subTotal * 0.13);
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
    this.spinnerService.show();
    this.itemsService.checkoutCart(this.userItems, this.user).subscribe((message:any) => {
      this.spinnerService.hide();
      //console.log(message);
      if (message.message == "SUCCESS") {

        // Clear user's cart
        this.itemsService.clearCart(this.userItems).subscribe((message:any) => {
          //console.log(message)
        });

        this.priorBalance = message.response.balance_before;
        this.afterBalance = message.response.balance_after;
        this.xmrGrandTotal = message.response.amountTotal;
        this.grantTotalDollars = message.response.amountTotalDollars;
        this.totalFee = message.response.totalFee;

        let userChoices = document.getElementById("walletDetailPopup");
        let notUserChoices = document.getElementById("checkoutPopup");
        this.visibilityToggle(userChoices, notUserChoices);
      }
      else if (message.message == "FAILED" && message.reason == "transaction already underway on your account, please wait 10 confirmations (~20 min).") {
        alert(`Error:\nNot enough unlocked funds\nor\n` + message.reason+ " (Check MyWallet to see transactions and balance).");
      }
      else if (message.message == "FAILED" && message.reason == "not enough funds") {
        alert(`Error: ` + message.reason);
      }
      else if (message.message == "FAILED" && message.reason == "time out") {
        alert(`Error (no funds were moved): ` + message.reason);
      }
    });
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
