import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';
import {GeolocationService} from '@ng-web-apis/geolocation';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ShoppingCartItem } from '../ShoppingCartItem';
import { TokenStorageService } from '../token-storage.service';
import { User } from '../User';
import { CryptoService } from '../crypto.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  item: any;
  images: any;
  bigImgSrc: any;
  selectedColor: any;
  selectedSize: any;
  itemTitle: any;
  description: any;
  userLocation: any;
  user: User;


  constructor(private itemsService: ItemsService, 
    private readonly geolocation$: GeolocationService,
    private readonly userService: UserService,
    private router: Router, private tokenStorage: TokenStorageService,
    private cryptoService: CryptoService) {
      this.user = this.tokenStorage.getUser();
    }

  ngOnInit(): void {
    this.itemTitle = decodeURI(window.location.pathname.split("/")[2]);
    this.itemsService.getOneItem(this.itemTitle).subscribe(item => {
      this.item = item.data;
      this.images = this.item.images;
      this.bigImgSrc = this.item.images[0];
      this.selectedColor = this.item.colors[0];
      this.selectedSize = this.item.sizes[0];
      this.description = this.item.description;
      console.log(this.item);
      this.cryptoService.getXMRrate().subscribe((res: any) => {
          
        this.item['xmrPrice'] = (this.item.price/res.data.data.monero.cad);
      });
    });
    
    /* Comment out until GPS API is fixed
    this.geolocation$.subscribe(position => {

      this.userService.getUserCountry(position.coords.latitude, position.coords.longitude).subscribe((details) => {
        this.userLocation = details.countryName;
      });
    });
    */
  }

  ngOnDestroy() : void {
    // memory cleanup TODO
  }
  
  onImageChange(event:any){
    this.bigImgSrc = event;
  }
  changeColor(event:any){ // Change selected color & style of respective button
    this.selectedColor = event;
  }
  changeSize(event:any){ // Change selected size & style of respective button
    this.selectedSize = event;
  }
  toggleVisibility(userChoice : any, notUserChoice : any) {
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
  addToCart(){
    let userChoices = document.getElementById("addedToCartPopup");
    let notUserChoices = document.getElementById("boughtPopup");
    this.toggleVisibility(userChoices, notUserChoices);

    
    const item: ShoppingCartItem = {
      userId: this.user._id,
      sellerId : this.item.userId,
      title : this.item.title,
      description : this.item.description,
      price : this.item.price,
      images : this.item.images, // adding all images if needed you can add single images as well.
      color : this.selectedColor,
      size : this.selectedSize,
      firstName : this.item.firstName,
      shippingOption: this.item.shippingOption,
      itemId: this.item._id,
      quantity : 1
    };
    
    this.itemsService.addItemInCart(item).subscribe((message:any) => {/*console.log(message)*/});
    
    // show notification  that item is added. create one service to show otification at this point. highly recomanded.
    // this.router.navigate(['/shoping-cart']);
  }
  buyNow(){
    let userChoices = document.getElementById("boughtPopup");
    let notUserChoices = document.getElementById("addedToCartPopup");
    this.toggleVisibility(userChoices, notUserChoices);

    const item: any = {
      userId : this.item.userId,
      title : this.item.title,
      description : this.item.description,
      price : this.item.price,
      images : this.item.images, // adding all images if needed you can add single images as well.
      color : this.selectedColor,
      size : this.selectedSize,
      firstName : this.item.firstName,
      shippingOption: this.item.shippingOption,
      itemId: this.item._id,
      quantity : 1,
      time: new Date()
    };
    this.itemsService.buyItem(item)
  }
  continueBrowsing() {
    let userChoices = document.getElementById("addedToCartPopup");
    let userChoices2 = document.getElementById("boughtPopup");

    if (userChoices && userChoices.style.visibility == "visible") {
      userChoices.style.visibility = "hidden";
      userChoices.style.animation = "none";
      userChoices.style.animationDuration = "0ms";
    }
    else if(userChoices2 && userChoices2.style.visibility == "visible") {
      userChoices2.style.visibility = "hidden";
      userChoices2.style.animation = "none";
      userChoices2.style.animationDuration = "0ms";
    }
  }
}
