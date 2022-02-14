import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';
import {GeolocationService} from '@ng-web-apis/geolocation';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

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


  constructor(private itemsService: ItemsService, 
    private readonly geolocation$: GeolocationService,
    private readonly userService: UserService,
    private router: Router) { 
      
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
    });

    this.geolocation$.subscribe(position => {

      this.userService.getUserCountry(position.coords.latitude, position.coords.longitude).subscribe((details) => {
        this.userLocation = details.countryName;
      });
    });
  }

  ngOnDestroy() : void {
    // memory cleanup TODO
  }
  
  onImageChange(event:any){
    this.bigImgSrc = event;
  }
  changeColor(event:any){ // Change selected color & style of respective button
    this.selectedColor = event;
    
    /* ABANDONED IDEA (STYLE CHANGE IN TS)
    const cButton: HTMLElement | null = document.getElementById(event)!;
    cButton.style.background = "#e5e5e5";
    */

  }
  changeSize(event:any){ // Change selected size & style of respective button
    this.selectedSize = event;
  }
  addToCart(){
    console.log(this.item);
    const item:any = {}; // creating a object to send to server to save it. you can
                         // send simply item id and size and color and when visit component
                         // you can call item by id/title and show it. 
                         // curretly I am addig whole item and call whole item and showig it.
    item._id = this.item._id;
    item.userId = this.item.userId;
    item.title = this.item.title;
    item.description = this.item.description;
    item.price = this.item.price;
    item.images = this.item.images; // adding all images if needed you can add single images as well.
    item.color = this.selectedColor;
    item.size = this.selectedSize;
    item.quantity = 1; // if you want to add quantity here as well 
    this.itemsService.addItemInCart(item);
    alert("Item Sucesfuly Added")
    // show notification  that item is added. create one service to show otification at this point. highly recomanded.
    // this.router.navigate(['/shoping-cart']);
  }
}
