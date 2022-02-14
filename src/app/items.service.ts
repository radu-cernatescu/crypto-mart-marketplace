import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as ENV } from '../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { User } from './User';
import { Item } from './Item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  CMS_API: string;
  imgurAPI: string;
  imgurKey: string;
  sellItemsChanged = new Subject<any[]>();
  startedEditing = new Subject<Item>();
  userItemsIncart: any[] = [];

  constructor(private http: HttpClient) {
    this.CMS_API = ENV.CMS_API;
    this.imgurAPI = ENV.imgurAPI;
    this.imgurKey = ENV.imgurKey;
  }

  getItems(): Observable<any> {
    return this.http.get(this.CMS_API + "items");
  }

  getItem(item: Item): Observable<any> {
    return this.http.post(this.CMS_API + "user-item", { item: item });
  }
  getOneItem(title: any): Observable<any> {
    return this.http.get(this.CMS_API + "item" , {
      params: new HttpParams().set('title', title)
  });
  }

  getUserItems(user: User): Observable<any> {
    return this.http.post(this.CMS_API + "user-items", user);
  }
 
  addUserItem(user: User, item: Item): Observable<any> {
    item.userId = user._id;
    item.firstName = user.firstName;
    return this.http.post(this.CMS_API + "add-item", {user: user, item: item});
  }

  updateUserItem(user: User, olditem: Item, newitem: Item) {
    return this.http.post(this.CMS_API + "update-item", { user: user, newitem: newitem, olditem: olditem });
  }

  deleteUserItem(user: User, item: Item) {
    return this.http.post(this.CMS_API + "remove-item", {user: user, item: item});
  }

  uploadImage(image: File) {
    let formData = new FormData();
    formData.append('image', image, image.name);
    return this.http.post(this.imgurAPI, formData, {headers: new HttpHeaders({'Authorization': 'Client-ID ' + this.imgurKey})});
  }
  getUserCartItem(){
    return this.userItemsIncart;
    // call a API to get items. 
    // this will be called to get all items and every time you visit
    // shoppig cart. 
  }
  addItemInCart(item:any){
    //const index = this.userItemsIncart.indexOf(item);
    const index = this.userItemsIncart.findIndex(e => e.title == item.title && e.size == item.size && e.color == item.color);
    if(index < 0){
      this.userItemsIncart.push(item);
    } else{
      if(this.userItemsIncart[index].quantity){
        this.userItemsIncart[index].quantity += 1;
      } else{
        this.userItemsIncart[index].quantity = 2;
      }
      
    }
    // call a API to add it. after add refresh cart compoent
    // to show remaining items in cart. 
  }
  deleteItemFromCart(index:number) {
    // I am directly passing index but you have to send item and find index. 
    // but if works with this also while clling API then Great
    this.userItemsIncart.splice(index, 1);
    // call a API to delete it. after delete refresh cart compoent
    // to show remaining items in cart. 
  }
}
