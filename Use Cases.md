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


### 2. Create Client's Profile
  1. *Author*: Charmi Darji
  2. *Description*: Client creates a Buyer/Seller account and becomes validated as an official customer for CryptoMart. 
  3. *Actor(s)*: Buyer
  4. *Preconditions*: 
     1. The CryptoMart system is running and working.
     2. The Client is at home page.
  5. *Sucessful Post Conditions*: 
     1. The Client has successfully created a Buyer/Seller Profile 
     2. Client has been added to the system database 
  6. *Business Rules*: 
     1. Client must have valid billing details, personal contact information, and password.
     2. The Buyer has a valid payment method.
     3. The Seller agrees to terms and conditions of not putting up illegal items for sale

  7. *Main Flow*:
 
|     | Buyer/Seller                       | System                                                                                                                                                                                                                                                                                          |
| --- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   |Visits Home page to create Profile  | Request personal details including: email address, first name, last name, contact number.                                                                                                                                                                                                        |
| 2   | Enter the required information     | Send a validation code to the provided number to verity the details and authenticate the profile                                                                                                                                                                                                |
| 3   | Create a wallet                    | Link the user's crypto currency to their Profile and add funds to the wallet                                    |
| 4   | Add Shipping information           | Enter Apt/house no., Postal code, City and Country                                                              |  
| 5   | Confirm profile details            | Save all account information to system and save the user information including wallet information, e-mail, shipping address, phone number and personal information                                                        |
| 6   | Buyer can access Shopping Cart     | Add, delete or view items in the Shopping  Cart list                                                            |  
| 7   | Buyer can switch his current account to a Seller account     | Agree to terms and conditions which adds a section to put up items for sale making it a Seller account                                                      |  

8. *Alternate Flow*:
  
|     | Alternate Flow                                          | Description                                                                                                                                                                                             |
| --- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A1  | Invalid user details                                    | System asks customer to re-enter the user information and validates it or cancel the request       |
| A2  | Login through FaceBook or Google account                | Redirect to Facebook or google account login page and request account information including username/email and password to sign in using an existing third party account (google or facebook  |
| A3  | User cancels request                                    | User Cancels Request	At any time, the User may choose to cancel the account creation.  At this point, the processing is discontinued and the user is notified that the account management request has been cancelled.     |           

### 3. 

### 4. 