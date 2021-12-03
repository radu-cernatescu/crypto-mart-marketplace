import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SellService } from '../user-profile/sell.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  sellItems: any;
  subscription!: Subscription;

  constructor(private sellService: SellService) { }

  ngOnInit(): void {
    this.sellItems = this.sellService.getSellItems();
    this.subscription = this.sellService.sellItemsChanged
      .subscribe(
        (sellItems: any[]) => {
          this.sellItems = sellItems;
        }
      );
  }

}
