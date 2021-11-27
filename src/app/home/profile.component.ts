import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SellService } from './sell.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  sellItems: any;
  subscription!: Subscription;

  constructor(private sellServicce: SellService) { }

  ngOnInit(): void {
    this.sellItems = this.sellServicce.getSellItems();
    this.subscription = this.sellServicce.sellItemsChanged
      .subscribe(
        (sellItems: any[]) => {
          this.sellItems = sellItems;
        }
      );
  }
  onEditItem(i:number){
    this.sellServicce.startedEditing.next(i);
  }
}
 