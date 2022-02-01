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
  sizeForm = new FormGroup({
    size: new FormControl('', Validators.required,)
  })
  colorForm = new FormGroup({
    color: new FormControl('', Validators.required,)
  })
  paramForm = new FormGroup({
    Pname: new FormControl('', Validators.required,),
    pValue: new FormControl('', Validators.required,),
  })
  selectedFile!: File[];
  subscription!: Subscription;
  editedItemIndex!: number;
  editedItem: Item;
  user: User;
  initialItem: Item;
  newItem: Item;
  parameters: {name:string, value:string}[] = [];
  sizes: string[] = [];
  colors: string[] = [];

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
        this.sizes = item.sizes;
        this.colors = item.colors;
        this.parameters = item.parameters;
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

  //
  sellItem(){
    this.sellMode = true;
  }

  //
  onAdd(){
    this.newItem.title = this.itemForm.value['name'];
    this.newItem.description = this.itemForm.value['description'];
    this.newItem.price = this.itemForm.value['amount'];
    this.newItem.userId = this.user._id;
    this.newItem.colors = this.colors;
    this.newItem.sizes = this.sizes;
    this.newItem.parameters = this.parameters;

    if (this.selectedFile) {
      this.newItem.images = [];
      // Upload selected images to Imgur
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

  //
  onClear() {
    this.itemForm.reset();
    this.paramForm.reset();
    this.sizeForm.reset();
    this.colorForm.reset();
    this.parameters = [];
    this.sizes = [];
    this.colors = [];
    this.editMode = false;
  }

  //
  onCancel(){
    this.itemForm.reset();
    this.editMode = false;
    this.sellMode = false;
  }

  //
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

  //
  processFile(event: any) {
    /* DEBUG code
    const ll = event.target.files.length;
    let i = 0;
    while(i < ll){
      const aa = event.target.files[i];
      this.selectedFile.push((aa));
      i++;
    */
    this.selectedFile = event.target.files;
  }

  //
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

  //
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

  // add colour to the list
  addColor(){
    console.log(this.colorForm.controls['color'].value);
    this.colors.push(this.colorForm.controls['color'].value);
  }

  // delete a colour from the list of colours
  deleteColor(color: string) {
    const index = this.colors.indexOf(color);
    this.colors.splice(index, 1);
  }

  // add size to the list
  addSize(){
    console.log(this.sizeForm.controls['size'].value);
    this.sizes.push(this.sizeForm.controls['size'].value);
  }

  // delete a size from the list of sizes
  deleteSize(size: string) {
    const index = this.sizes.indexOf(size);
    this.sizes.splice(index, 1);
  }

  // add custom parameter to the list
  addParam(){
    const name = this.paramForm.controls['Pname'].value;
    const value = this.paramForm.controls['pValue'].value;
    const item = {name, value};
    this.parameters.push(item);
  }

  // delete custom parameter from the list of parameters
  deleteParam(param:{name:string, value:string}) {
    const index = this.parameters.indexOf(param);
    this.parameters.splice(index, 1);
  }
}
