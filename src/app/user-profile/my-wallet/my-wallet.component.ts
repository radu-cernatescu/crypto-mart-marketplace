
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

  xmrToCad: number = 0;
  cadEquivalentBalance: number = 0;
  cadEquivalentUnlockedBalance: number = 0;

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
  }

  refreshWallet() {
    document.getElementById("address")!.innerHTML = '';
    this.fetchWallet();
  }

  fetchWallet() {
    this.spinnerService.show("sync");
    this.cryptoService.getWalletInfo(this.user).subscribe((res: any) => {
      console.log(res);
      this.spinnerService.hide("sync");
      
      if (res.message == "FAILED") {
        this.fetchWallet();
      }
      else {
        this.myWallet = res.wallet;
      }

      if (this.myWallet.primaryAddress != '') {
        document.getElementById("address")!.innerHTML = this.myWallet.primaryAddress;
        this.cryptoService.getXMRrate().subscribe((res: any) => {
          this.cadEquivalentBalance = this.myWallet.balance * res.data.data.monero.cad;
          this.cadEquivalentUnlockedBalance = this.myWallet.unlockedBalance * res.data.data.monero.cad;
          this.xmrToCad = res.data.data.monero.cad;
        });
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
                else if (transaction.type == "withdrawal" && transaction.from == this.myWallet.primaryAddress) {
                  this.withdrawals.push(this.myWallet.transactions[i]);
                }
                else {
                  this.deposits.push(this.myWallet.transactions[i]);
                }
              }
              else if (this.myWallet.transactions[i].isIncoming == true) {
                this.deposits.push(this.myWallet.transactions[i]);
              }

            });
          }
        }
      }
    });

    
  }

  withdraw() {
    let notDone = true;
    let amount: number = 0;
    while (notDone) {
      let str_amount = prompt("Please enter the amount in XMR to withdraw", `${this.myWallet.unlockedBalance}`);
      try {
        amount = parseFloat(str_amount!);
        if (amount > 0) {
          notDone = false;
        }
        else {
          alert("Invalid input for withdrawal. Please try again.");
        }
      } catch(err) {
          alert("Invalid input for withdrawal. Please try again.");
        }
    }

    

    let address = prompt("Please enter the address to send the XMR: \n(if it's not valid, say bye bye to the funds).", "");
      
    if (address != null) {
      this.spinnerService.show("withdraw");
    }
    let sweep = false;
    if (amount == this.myWallet.unlockedBalance) {
      sweep = true;
    }
    this.cryptoService.withdrawWallet(this.user, amount, address!, sweep).subscribe((res: any) => {
      console.log(res);
      if (res.message == "SUCCESS") {
        alert("Sucessfully withdrawn.");
        this.fetchWallet();
      }
      else {
        alert("Failed to withdraw.");
      }
      this.spinnerService.hide("withdraw");
    });
    
  }
}
