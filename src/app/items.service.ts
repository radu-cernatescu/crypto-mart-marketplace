import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as ENV } from '../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { User } from './User';
import { Item } from './Item';
import { TokenStorageService } from './token-storage.service';
import { ShoppingCartItem } from './ShoppingCartItem';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  CMS_API: string;
  imgurAPI: string;
  imgurKey: string;
  sellItemsChanged = new Subject<any[]>();
  startedEditing = new Subject<Item>();
  boughtItem: any = [];

  constructor(private http: HttpClient, private tokenService: TokenStorageService) {
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

  getUserCartItems(){
    return this.http.post(this.CMS_API + "get-shopping-cart", this.tokenService.getUser());
  }

  addItemInCart(item: ShoppingCartItem) { 
    let itemUserObj = { user: this.tokenService.getUser(), item: item };
    return this.http.post(this.CMS_API + "add-shopping-item", itemUserObj);
  }

  buyItem(item: any) { 
    this.boughtItem.push(item);
    
  }

  checkoutCart(items: ShoppingCartItem[]) {
    return this.http.post(this.CMS_API + "checkout-cart", items);
  }

  clearCart(items: ShoppingCartItem[]) {
    return this.http.post(this.CMS_API + "clear-cart", items);
  }

  editItemQuantity(item: ShoppingCartItem) {
    let itemUserObj = { user: this.tokenService.getUser(), item: item };
    return this.http.post(this.CMS_API + "update-shopping-item", itemUserObj);
  }

  deleteItemFromCart(item: ShoppingCartItem) {
    let itemUserObj = { user: this.tokenService.getUser(), item: item };
    return this.http.post(this.CMS_API + "remove-shopping-item", itemUserObj);
  }

  getUserOrders(user: User) {
    return this.http.post(this.CMS_API + "get-user-orders", user);
  }

  getOrders() {
    return this.http.get(this.CMS_API + "get-orders");
  }
}
