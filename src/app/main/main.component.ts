import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  sellItems: any[];
  subscription!: Subscription;

  constructor(private itemsService: ItemsService) {
    this.sellItems = [];
   }

  ngOnInit(): void {
    this.itemsService.getItems().subscribe(items => {
      //console.log(items.data);
      this.sellItems = items.data;
    });
    this.subscription = this.itemsService.sellItemsChanged.subscribe(
      (sellItems: any[]) => {
        this.sellItems = sellItems;
      }
    );
  }

}
