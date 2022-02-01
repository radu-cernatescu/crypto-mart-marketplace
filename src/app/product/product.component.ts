import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';
import { TokenStorageService } from '../token-storage.service';

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
  productName: any;
  description: any;
  user: any;

  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
    this.productName = decodeURI(window.location.pathname.split("/")[2]);
    this.itemsService.getOneItem(this.productName).subscribe(item => {
      this.item = item.data;
      this.images = this.item.images;
      this.bigImgSrc = this.item.images[0];
      this.selectedColor = this.item.colors[0];
      this.selectedSize = this.item.sizes[0];
      this.description = this.item.description;
    });
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
