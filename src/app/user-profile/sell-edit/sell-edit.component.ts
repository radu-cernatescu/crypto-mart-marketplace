import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SellService } from '../sell.service';


@Component({
  selector: 'app-sell-edit',
  templateUrl: './sell-edit.component.html',
  styleUrls: ['./sell-edit.component.css']
})
export class SellEditComponent implements OnInit {
  sellMode: boolean = false;
  editMode!: boolean; 
  itemForm = new FormGroup({
    name: new FormControl('', Validators.required,),
    description: new FormControl('', Validators.required,),
    amount: new FormControl('', Validators.required),
    imageInput: new FormControl('', Validators.required),
  });
  selectedFile!: File;
  subscription!: Subscription;
  editedItemIndex!: number;
  editedItem: any;

  constructor(private sellServicce: SellService) { }

  ngOnInit(): void {
    this.subscription = this.sellServicce.startedEditing
    .subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.sellMode = true;
        this.editedItem = this.sellServicce.getSellItem(index);
        this.itemForm.controls['name'].setValue(this.editedItem.name);
        this.itemForm.controls['amount'].setValue(this.editedItem.amount);
        this.itemForm.controls['description'].setValue(this.editedItem.description);
      }
    );
  }
  sellItem(){
    this.sellMode = true;
  }
  onAdd(){
    debugger
    const newItem = {
      name: this.itemForm.value['name'], description: this.itemForm.value['description'],
      amount:this.itemForm.value['amount'], imageInput: this.selectedFile
    };
    console.log(this.itemForm.value);
    if (this.editMode) {
      this.sellServicce.updateSellItem(this.editedItemIndex, newItem);
    } else {
      this.sellServicce.addSellItem(newItem);
    }
    this.editMode = false;
    this.sellMode = false;
    this.itemForm.reset();
  }
  onClear() {
    this.itemForm.reset();
    this.editMode = false;
  }
  onCancle(){
    this.sellMode = false;
  }

  onDelete() {
    this.sellServicce.deleteSellItem(this.editedItemIndex)
    this.onClear();
  }
  processFile(event: any) {
    console.log(event.target.files[0]);
    this.selectedFile = event.target.files[0];
  }
}
