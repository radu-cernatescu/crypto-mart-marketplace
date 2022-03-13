import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-my-oders',
  templateUrl: './my-oders.component.html',
  styleUrls: ['./my-oders.component.css']
})
export class MyOdersComponent implements OnInit {

  myOders : any = []
  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
    this.myOders =  this.itemsService.boughtItem;
    console.log(this.myOders)
  }

}
