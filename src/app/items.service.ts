import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as ENV } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getUserItems(user: User): Observable<any> {
    return this.http.post(this.CMS_API + "user-items", user);
  }

  addUserItem(user: User, item: Item): Observable<any> {
    item.userId = user._id;
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
}
