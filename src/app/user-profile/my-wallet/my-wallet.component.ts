import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-wallet',
  templateUrl: './my-wallet.component.html',
  styleUrls: ['./my-wallet.component.css']
})
export class MyWalletComponent implements OnInit {

  walletIsPreset!: boolean;
  myTransaction =  [
    {id : "fdfgfdgdf", date: 1649098351, amount: 500},
    {id : "fdfgfdgdf", date: 1649098351, amount: 500},
    {id : "fdfgfdgdf", date: 1649098351, amount: 500},
    {id : "fdfgfdgdf", date: 1649098351, amount: 500},
    {id : "fdfgfdgdf", date: 1649098351, amount: 500},
    {id : "fdfgfdgdf", date: 1649098351, amount: 500},
    {id : "fdfgfdgdf", date: 1649098351, amount: 500},

  ];
  constructor() { }

  ngOnInit(): void {
    // TO DO 
    // API To check wether wllet is genrated or not and balance and wllet detils
    // API to get All transaction details
  }
  genrateWllet(){
    // TO DO 
    // API To genrate wallet
    this.walletIsPreset = true;

  }

}
