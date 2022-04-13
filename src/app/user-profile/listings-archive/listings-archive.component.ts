import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from '../../Item';
import { ItemsService } from '../../items.service';

@Component({
  selector: 'app-listings-archive',
  templateUrl: './listings-archive.component.html',
  styleUrls: ['./listings-archive.component.css']
})
export class ListingsArchiveComponent implements OnInit {
  @Input() archiveMode: boolean = false;
  @Output() archiveModeChange = new EventEmitter<boolean>();
  subscription!: Subscription;

  constructor(private itemsService: ItemsService) {}

  ngAfterViewInit(){ 
  }

  ngOnInit(): void {
  }

}
