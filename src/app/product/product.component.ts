import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';

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

  constructor(private itemsService: ItemsService) { }

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
}
