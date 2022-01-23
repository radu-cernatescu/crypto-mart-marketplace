import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  item: any;
  curretId:any;
  images: any;
  bigImgSrc: any;
  selectedColor:any;
  selectedSize:any;
  constructor(private itemsService: ItemsService) {
    this.curretId = this.itemsService.currentId;
   }

  ngOnInit(): void {
    console.log(this.curretId);
    this.itemsService.getOneItem(this.curretId).subscribe(item => {
      //console.log(items.data);
      this.item = item.data;
      this.images = this.item.images;
      this.bigImgSrc = this.item.images[0];
      this.selectedColor = this.item.colors[0];
      this.selectedSize = this.item.sizes[0];
    });
  }
  
  onImageChange(event:any){
    console.log("bb");
    this.bigImgSrc = event;
  }
  changeColor(event:any){
    this.selectedColor = event;
  }
  changeSize(event:any){
    this.selectedSize = event;
  }

}
