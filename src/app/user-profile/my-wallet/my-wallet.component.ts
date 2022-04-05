
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

  constructor(private cryptoService: CryptoService,
    private tokenStorage: TokenStorageService,
    private spinnerService: NgxSpinnerService) {
      this.myWallet = new Wallet();
      this.user = this.tokenStorage.getUser();
    }

  ngOnInit(): void {
    this.refreshWallet();
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
    this.cryptoService.getWalletInfo(this.user).subscribe((res: any) => {
      if (res.message == "FAILED") {
        this.refreshWallet();
      }
      else if (res.wallet.balance == 0) {
        this.cryptoService.syncWallet(this.user).subscribe((res: any) => {
          this.myWallet = res.wallet;
        });
      }
      else {
        this.myWallet = res.wallet;
      }
    });
  }
}
