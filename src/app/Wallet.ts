export class Wallet {
    balance: number = 0; //  Balance in Atomic Units (One atomic unit is currently 1e-12 XMR (0.000000000001 XMR, or one piconero)
    primaryAddress: string = ''; // Very long string - looks like: 46G6moWH7kQJrjExVATHiyNhrXPLCUHwZeoGZta5QecHepE45m9Z279QVftVxfj5imHDMubV5imE6ik6saQK7hfd6PBv5JG
    transactions: any[] = []; // get ARRAY of transactions containing transfers to/from the wallet
    mnemonicPhrase: string = '';
    privateSpendKey: string = '';
    privateViewKey: string = '';
    unlockedBalance: number = 0;
};