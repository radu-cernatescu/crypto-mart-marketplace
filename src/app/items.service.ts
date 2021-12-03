import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as ENV } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from './User';
import { Item } from './Item';


@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  CMS_API: string;

  constructor(private http: HttpClient) {
    this.CMS_API = ENV.CMS_API;
  }

  getItems(): Observable<any> {
    return this.http.get(this.CMS_API + "items");
  }

  getUserItems(user: User) {
    return this.http.post(this.CMS_API + "user-items", user);
  }

  addUserItem() {
    //TO DO
  }

  updateUserItem() {
    //TO DO
  }
}
