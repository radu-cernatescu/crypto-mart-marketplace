import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellService {
  private sellItems: any[] = [
    {name: 'Pillow', amount: 2.3, description:"I'm comfy af",
    imageInput: "../../assets/img/logo.png"},
    {name: 'Coffee Mug', amount: 3, description:"djkadkel",
    imageInput: '../../assets/img/logo.png'},
    {name: 'iPhone 13', amount: 0.3, description:"waste of $$$",
    imageInput: '../../assets/img/logo.png'},
  ];
  sellItemsChanged = new Subject<any[]>();
  startedEditing = new Subject<number>();
  constructor() { }
  getSellItems() {
    return this.sellItems.slice();
  }
  getSellItem(index: number) {
    return this.sellItems[index];
  }
  addSellItem(item: any) { 
    this.sellItems.push(item);
    this.sellItemsChanged.next(this.sellItems.slice());
  }
  updateSellItem(index: number, item: any) {
    this.sellItems[index] = item;
    this.sellItemsChanged.next(this.sellItems.slice());
  }

  deleteSellItem(index: number) {
    this.sellItems.splice(index, 1);
    this.sellItemsChanged.next(this.sellItems.slice());
  }
}
