import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TokenStorageService } from '../../token-storage.service';
import { Subscription } from 'rxjs';
import { User } from '../../User';
import { Item } from '../../Item';
import { ItemsService } from '../../items.service';

@Component({
  selector: 'app-market-listings',
  templateUrl: './market-listings.component.html',
  styleUrls: ['./market-listings.component.css']
})
export class MarketListingsComponent implements OnInit {
  @Input() listingsMode: boolean = false;
  @Output() listingsModeChange = new EventEmitter<boolean>();
  user: User;
  sellItems: Item[];
  subscription!: Subscription;

  constructor(private tokenService: TokenStorageService, private itemsService: ItemsService) {
    this.user = this.tokenService.getUser();
    this.sellItems = [];
  }

  ngAfterViewInit() {
    this.subscription = this.itemsService.startedEditing
      .subscribe(
        (item: Item) => {
          this.listingsMode = true;
          this.listingsModeChange.emit(this.listingsMode);
        });
  }

  ngOnInit(): void {
    this.itemsService.getItems().subscribe(items => {
      items.data.forEach((element: any) => {
        if (element.userId == this.user._id) {
          let item = new Item();
          item.userId = element._id;
          item.title = element.title;
          item.description = element.description;
          item.price = element.price;
          item.images = element.images;
          item.parameters = element.parameters;
          item.colors = element.colors;
          item.sizes = element.sizes;
          item.shippingOption = element.shippingOption;
          this.sellItems.push(item);
        }
      });
    });
    this.subscription = this.itemsService.sellItemsChanged.subscribe(
      (sellItems: any[]) => {
        this.sellItems = sellItems;
      }
    );
  }

  onEditItem(item: Item) {
    this.subscription = this.itemsService.startedEditing.subscribe(
        (item: Item) => {
          this.listingsMode = false;
          this.listingsModeChange.emit(this.listingsMode);
        });

    this.itemsService.startedEditing.next(item);
  }

}
