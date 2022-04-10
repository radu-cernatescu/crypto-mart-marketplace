import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CryptoService } from '../crypto.service';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  sellItems: any[];
  subscription!: Subscription;

  constructor(private itemsService: ItemsService,
    private cryptoService: CryptoService) {
    this.sellItems = [];
   }

  ngOnInit(): void {
    this.itemsService.getItems().subscribe(items => {
      this.sellItems = items.data;
      console.log(this.sellItems);
      for (let i = 0; i < this.sellItems.length; i++) {
        this.cryptoService.getXMRrate().subscribe((res: any) => {
          
          this.sellItems[i]['dollarPrice'] = (this.sellItems[i].price/res.data.data.monero.cad);
        });
      }
    });
    this.subscription = this.itemsService.sellItemsChanged.subscribe(
      (sellItems: any[]) => {
        this.sellItems = sellItems;
      }
    );
  }
}
