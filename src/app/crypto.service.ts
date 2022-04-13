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

  withdrawWallet(user: User, amount: number, address: string, sweep: boolean) {
    return this.http.post(this.CMS_API + "withdraw-wallet", {user: user, amount: amount, address: address, sweep: sweep});
  }

  getTransactionType(txid: any) {
    console.log(txid)
    return this.http.post(this.CMS_API + "get-transaction-type", {txid: txid});
  }

  setTransactionType(txid: string) {
    return this.http.post(this.CMS_API + "set-transaction-type", txid);
  }

  getXMRrate() {
    return this.http.get(this.CMS_API + "get-xmr-rate");
  }
}
