
import { Component, OnInit } from '@angular/core';
import { CryptoService } from 'src/app/crypto.service';
import { TokenStorageService } from 'src/app/token-storage.service';
import { Wallet } from 'src/app/Wallet';
import { NgxSpinnerService } from "ngx-spinner";
import { User } from 'src/app/User';

@Component({
  selector: 'app-my-wallet',
  templateUrl: './my-wallet.component.html',
  styleUrls: ['./my-wallet.component.css']
})
export class MyWalletComponent implements OnInit {
  myWallet: Wallet;
  user: User;
  deposits: any[];
  withdrawals: any[];
  purchases: any[];
  soldListings: any[];

  constructor(private cryptoService: CryptoService,
    private tokenStorage: TokenStorageService,
    private spinnerService: NgxSpinnerService) {
      this.myWallet = new Wallet();
      this.user = this.tokenStorage.getUser();
      this.deposits = [];
      this.withdrawals = [];
      this.purchases = [];
      this.soldListings = [];
    }

  ngOnInit(): void {
    this.fetchWallet();
    let spinnerCheck = setInterval(() => {
      try {
        if (document.getElementById("address")!.innerHTML == '') {
          this.spinnerService.show();
        }
        else {
          this.spinnerService.hide();
        }
      } catch(err) {
        clearInterval(spinnerCheck);
      }
    }, 1000);
  }

  refreshWallet() {
    document.getElementById("address")!.innerHTML = '';
    this.fetchWallet();
  }

  fetchWallet() {
    this.cryptoService.getWalletInfo(this.user).subscribe((res: any) => {
      console.log(res);
      
      if (res.message == "FAILED") {
        this.fetchWallet();
      }
      else {
        this.myWallet = res.wallet;
      }

      if (this.myWallet.primaryAddress != '') {
        document.getElementById("address")!.innerHTML = this.myWallet.primaryAddress;
        console.log(this.myWallet.transactions);
        
        if (this.myWallet.transactions.length > 0) {
          for (let i = 0; i < this.myWallet.transactions.length; i++) {
            this.deposits = [];
            this.purchases = [];
            this.withdrawals = [];
            this.soldListings = [];
            
            this.cryptoService.getTransactionType(this.myWallet.transactions[i].hash).subscribe((res: any) => {
              console.log(res)
              if (res.message == "SUCCESS") {
                console.log(this.myWallet.transactions[i]);
                let transaction = res.transaction;
                // purchases
                if (transaction.type == "purchase" && transaction.from == this.myWallet.primaryAddress) {
                  this.purchases.push(this.myWallet.transactions[i]);
                }
                // sold listings
                else if (transaction.type == "purchase" && transaction.to == this.myWallet.primaryAddress) {
                  this.soldListings.push(this.myWallet.transactions[i]);
                }
                else if (transaction.type == "withdrawal") {
                  this.withdrawals.push(this.myWallet.transactions[i]);
                }
              }
              else if (res.message == "FAILED" && this.myWallet.transactions[i].isIncoming == true) {
                this.deposits.push(this.myWallet.transactions[i]);
              }

            });
          }
        }
      } else {
        window.location.reload();
      }
    });

    
  }
}
