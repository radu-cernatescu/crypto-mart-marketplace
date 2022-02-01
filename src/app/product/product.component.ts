import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';
import {GeolocationService} from '@ng-web-apis/geolocation';
import { UserService } from '../user.service';

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
    private readonly userService: UserService) { 
      
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
  changeColor(event:any){
    this.selectedColor = event;
  }
  changeSize(event:any){
    this.selectedSize = event;
  }
}
