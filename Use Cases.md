# Use Cases

### 1. Buyer checks out and pays
  1. *Author*: Radu Cernatescu
  2. *Description*: Buyer has finished shopping then clicks checkout in shopping cart and pays.
  3. *Actor(s)*: Buyer
  4. *Preconditions*: Buyer must have generated at least one wallet address in the wallet page (otherwise there's no way he has money to pay).
  5. *Sucessful Post Conditions*: The buyer's marketplace wallet will be debited the grand total in the respective cryptocurrencies of the transaction.
  6. *Business Rules*: The Buyer must have enough balance in their marketplace cryptocurrency wallet to cover the grand total.
  7. *Main Flow*:

|     | Buyer                              | System                                                                                                                                                                                                                                                                                          |
| --- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Clicks to view their shopping cart | if wallet balance can cover the total, the checkout button will redirect to checkout                                                                                                                                                                                                            |
| 2   | Clicks checkout                    | shipping details are requested                                                                                                                                                                                                                                                                  |
| 3   | Clicks pay                         | For each order, the Buyer can select which crypto wallet (BTC, BHC, DOGE) to debit from, if and only if, the Seller allows payment of multiple cryptos, otherwise Buyer is forced to debit whatever Seller prefers. Sellers are encouraged to accept more cryptos for more potential customers. |
| 4   | Clicks place order                 | Order confirmation page appears                                                                                                                                                                                                                                                                 |

  8. *Alternate Flow*:
  
|     | Alternate Flow                                          | Description                                                                                                                                                                                             |
| --- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A1  | If wallet balance is too low                            | At this point the buyer should have deposited crypto in their wallets; the checkout button will redirect to wallet page to deposit crypto.                                                              |
| A2  | If an item was sold while in checkout process           | The item is reserved once paid. The system will take the buyer to back to the shopping cart.                                                                                                            |
| A3  | Buyer chooses to add special delivery instructions      | since each item is unique, delivery instructions can be given on an item basis (since potentially, you will have multiple sellers' items in shopping cart).                                             |
| A4  | If the Buyer does not have balance of a specific crypto | It's possible that the Buyer can have crypto deposited, but not have deposited the crypto that the Seller is asking for (i.e. Seller prefers BTC but you only have DOGE). The market does not convert! |

### 2. 

### 3. 

### 4. 
