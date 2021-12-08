import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ItemsService } from 'src/app/items.service';
import { Item } from 'src/app/Item';
import { User } from 'src/app/User';
import { TokenStorageService } from 'src/app/token-storage.service';

@Component({
  selector: 'app-sell-edit',
  templateUrl: './sell-edit.component.html',
  styleUrls: ['./sell-edit.component.css']
})
export class SellEditComponent implements OnInit{
  sellMode: boolean = false;
  editMode!: boolean; 
  itemForm = new FormGroup({
    name: new FormControl('', Validators.required,),
    description: new FormControl('', Validators.required,),
    amount: new FormControl('', Validators.required),
    imageInput: new FormControl('', Validators.required),
  });
  selectedFile!: File[];
  subscription!: Subscription;
  editedItemIndex!: number;
  editedItem: Item;
  user: User;
  initialItem: Item;
  newItem: Item;

  constructor(private ItemsService: ItemsService, private tokenStorageService: TokenStorageService) {
    this.editedItem = new Item();
    this.initialItem = new Item(); 
    this.newItem = new Item();
    this.user = tokenStorageService.getUser();
   }
   ngAfterViewInit(){ 
    this.subscription = this.ItemsService.startedEditing
    .subscribe(
      (item: Item) => {
        this.itemForm.controls['imageInput'].clearValidators();
        this.itemForm.controls['imageInput'].updateValueAndValidity();
        this.editMode = true;
        this.sellMode = true;
        this.editedItem = item;
        this.initialItem = item;
        this.itemForm.controls['name'].setValue(this.editedItem.title);
        this.itemForm.controls['amount'].setValue(this.editedItem.price);
        this.itemForm.controls['description'].setValue(this.editedItem.description);
        this.newItem.images = item.images; 
        // this.itemForm.controls['imageInput'].clearValidators;
        // this.itemForm.controls['imageInput'].updateValueAndValidity;
      }
    );

   }
  ngOnInit(): void {
    // this.subscription = this.ItemsService.startedEditing
    // .subscribe(
    //   (item: Item) => {
    //     this.itemForm.controls['imageInput'].clearValidators;
    //     this.itemForm.controls['imageInput'].updateValueAndValidity;
    //     this.editMode = true;
    //     this.sellMode = true;
    //     this.editedItem = item;
    //     this.initialItem = item;
    //     this.itemForm.controls['name'].setValue(this.editedItem.title);
    //     this.itemForm.controls['amount'].setValue(this.editedItem.price);
    //     this.itemForm.controls['description'].setValue(this.editedItem.description);
    //     // this.itemForm.controls['imageInput'].clearValidators;
    //     // this.itemForm.controls['imageInput'].updateValueAndValidity;
    //   }
    // );
  }
  sellItem(){
    this.sellMode = true;
  }
  onAdd(){
    this.newItem.title = this.itemForm.value['name'];
    this.newItem.description = this.itemForm.value['description'];
    this.newItem.price = this.itemForm.value['amount'];
    this.newItem.userId = this.user._id;

    if (this.selectedFile) {
      this.newItem.images = [];
      // Upload to Imgur
      for(let i of this.selectedFile){
        this.ItemsService.uploadImage(i).subscribe(
          (res: any) => {
            if (res.success == true) {
              this.newItem.images.push(res.data.link);
            }
  
          }
        );
      }
      setTimeout(() => {
        if (this.editMode) {
          console.log(this.newItem);
          this.updateItem();
        }
        else {
          this.addItem();
        }
        
      }, 5000);
    }
    else {
      if (this.editMode) {
        this.updateItem();
      }
      else {
        this.addItem();
      }
    }
    
  }
  onClear() {
    this.itemForm.reset();
    this.editMode = false;
  }
  onCancel(){
    this.itemForm.reset();
    this.editMode = false;
    this.sellMode = false;
  }

  onDelete() {
    this.ItemsService.deleteUserItem(this.user, this.editedItem).subscribe(
      (res: any) => {
        if (res.message == "SUCCESS") {
          alert("Item deleted successfully");
          this.editMode = false;
          this.sellMode = false;
          this.itemForm.reset();
          window.location.reload();
        }
      }
    );
  }
  processFile(event: any) {
    //debugger
    // const ll = event.target.files.length;
    // let i = 0;
    // while(i < ll){
    //   const aa = event.target.files[i];
    //   this.selectedFile.push((aa));
    //   i++;
    // }
    this.selectedFile = event.target.files;
    //console.log(this.selectedFile)
  }

  // Helpers
  updateItem() {
    this.ItemsService.updateUserItem(this.user, this.initialItem, this.newItem).subscribe(
      (res: any) => {
        console.log(res);
        if (res.message == "SUCCESS") {
          alert("Item updated successfully");
          this.editMode = false;
          this.sellMode = false;
          this.itemForm.reset();
          window.location.reload();
        }
        else if (res.message == "EXISTING ITEM WITH SAME TITLE") {
          alert("Item with same title already exists");
        }
      }
    );
  }

  addItem() {
    this.ItemsService.addUserItem(this.user, this.newItem).subscribe(
      (res: any) => {
        if (res.message == "SUCCESS") {
          alert("Item added successfully");
          this.editMode = false;
          this.sellMode = false;
          this.itemForm.reset();
          window.location.reload();
        }
        else if (res.message == "EXISTING ITEM WITH SAME TITLE") {
          alert("Item with same title already exists");
        }
      }
    );
  }
}
