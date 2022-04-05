import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from '../environments/environment';
import { User } from './User';
import { Wallet } from './Wallet';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  CMS_API: string;
  myWallet: Wallet;

  constructor(private http: HttpClient) {
    this.CMS_API = ENV.CMS_API;
    this.myWallet = new Wallet();
  }

  getWalletInfo(user: User) {
    return this.http.post(this.CMS_API + "get-wallet-info", user);
  }

  syncWallet(user: User) {
    return this.http.post(this.CMS_API + "sync-wallet", user);
  }
}
