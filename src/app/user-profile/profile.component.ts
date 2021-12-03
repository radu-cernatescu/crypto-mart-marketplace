import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SellService } from './sell.service';
import { TokenStorageService } from '../token-storage.service';
import { User } from '../User';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  sellItems: any[];
  subscription!: Subscription;
  user: User;

  constructor(private sellService: SellService, private tokenService: TokenStorageService,
    private itemsService: ItemsService) {
    this.user = this.tokenService.getUser();
    this.sellItems = [];
  }

  ngOnInit(): void {
    this.itemsService.getItems().subscribe(items => {
      console.log(items.data);
      items.data.forEach((element: any) => {
        if (element.userId == this.user._id) {
          this.sellItems.push(element);
        }
      });
    });
    this.subscription = this.sellService.sellItemsChanged
      .subscribe(
        (sellItems: any[]) => {
          this.sellItems = sellItems;
        }
    );
  }
  onEditItem(i:number){
    this.sellService.startedEditing.next(i);
  }
}
 