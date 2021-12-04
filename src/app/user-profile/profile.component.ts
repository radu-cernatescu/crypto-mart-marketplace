import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TokenStorageService } from '../token-storage.service';
import { User } from '../User';
import { Item } from '../Item';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  sellItems: Item[];
  subscription!: Subscription;
  user: User;

  constructor(private tokenService: TokenStorageService, private itemsService: ItemsService) {
    this.user = this.tokenService.getUser();
    this.sellItems = [];
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
  onEditItem(item: Item){
    this.itemsService.startedEditing.next(item);
  }
}
 