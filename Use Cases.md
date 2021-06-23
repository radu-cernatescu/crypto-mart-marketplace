# Use Cases

### 1. Buyer checks out and pays
  1.1. *Author*: Radu Cernatescu
  
  1.2. *Description*: Buyer has finished shopping then clicks checkout in shopping cart and pays.
  
  1.3. *Actor(s)*: Buyer
  
  1.4. *Preconditions*: Buyer must have generated at least one wallet address in the wallet page (otherwise there's no way he has money to pay).
  
  1.5. *Successful Post Conditions*: The buyer's marketplace wallet will be debited the grand total in the respective cryptocurrencies of the transaction.
  
  1.6. *Business Rules*: The Buyer must have enough balance in their marketplace cryptocurrency wallet to cover the grand total.
  
  1.7. *Main Flow*:
|     | Buyer                              | System                                                                                                                                                                                                                                                                                               |
| --- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Clicks to view their shopping cart | If wallet balance can cover the total (A1), the checkout button will redirect to checkout.                                                                                                                                                                                                           |
| 2   | Clicks Checkout                    | Shipping details are requested (A3).                                                                                                                                                                                                                                                                 |
| 3   | Enters shipping details            | Once all details filled, the "Pay" button becomes available.                                                                                                                                                                                                                                         |
| 4   | Clicks Pay                         | For each order, the Buyer can select which crypto wallet (BTC, BHC, DOGE) to debit from, if and only if, the Seller allows payment of multiple cryptos, otherwise Buyer is forced to debit whatever Seller prefers (A4). Sellers are encouraged to accept more cryptos for more potential customers. |
| 5   | Clicks Place Order                 | Order confirmation page appears (A2).                                                                                                                                                                                                                                                                |

  1.8. *Alternate Flow*:

|     | Alternate Flow                                          | Description                                                                                                                                                                                                                                                          |
| --- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A1  | If wallet balance is too low                            | At this point the buyer should have deposited crypto in their wallets; the checkout button will redirect to wallet page to deposit crypto.                                                                                                                           |
| A2  | If an item was sold while in checkout process           | The item is reserved once paid. If an item is paid for while another buyer is in the checkout process, that item is not debited from the other buyer's account and is simply skipped (Other buyer is also given a message that their item of interest has been sold) |
| A3  | Buyer chooses to add special delivery instructions      | Since each item is unique, delivery instructions can be given on an item basis (since potentially, you will have multiple sellers' items in shopping cart).                                                                                                          |
| A4  | If the Buyer does not have balance of a specific crypto | It's possible that the Buyer can have crypto deposited, but not have deposited the crypto that the Seller is asking for (i.e. Seller prefers BTC but you only have DOGE). The market does not convert!                                                               |

### 2. Create Client's Profile
  2.1. *Author*: Charmi Darji
  
  2.2. *Description*: Client creates a Buyer/Seller account and becomes validated as an official customer for CryptoMart.
  
  2.3. *Actor(s)*: Buyer/Seller
  
  2.4. *Preconditions*: 
  
     2.4.1. The CryptoMart system is running and working.
     
     2.4.2. The Client is at home page.
     
  2.5. *Successful Post Conditions*: 
  
     2.5.1. The Client has successfully created a Buyer/Seller Profile 
     
     2.5.2. Client has been added to the system database 
     
  2.6. *Business Rules*: 
  
     2.6.1. Client must have valid billing details, personal contact information, and password.
     
     2.6.2. The Buyer has a valid payment method.
     
     2.6.3. The Seller agrees to terms and conditions of not putting up illegal items for sale

  2.7. *Main Flow*:
 
|     | Buyer/Seller                       | System                                                                                                                                                                                                                                                                                          |
| --- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   |Visits Home page to create Profile  | Request personal details including: email address, first name, last name, contact number.   (A1, A2)                                                                                                                                                                                            |
| 2   | Enter the required information     | Send a validation code to the provided number to verity the details and authenticate the profile                                                                                                                                                                                                |
| 3   | Create a wallet                    | Link the user's crypto currency to their Profile and add funds to the wallet                                    |
| 4   | Add Shipping information           | Enter Apt/house no., Postal code, City and Country                                                              |  
| 5   | Confirm profile details            | Save all account information to system and save the user information including wallet information, e-mail, shipping address, phone number and personal information     (A3)                                                   |
| 6   | Buyer can access Shopping Cart     | Add, delete or view items in the Shopping  Cart list                                                            |  
| 7   | Buyer can switch his current account to a Seller account     | Agree to terms and conditions which adds a section to put up items for sale making it a Seller account                                                      |  
| 8   | View or Add Items for Sale          | Seller can login to his profile to view, add or delete items he has put up on sale.                            |

2.8. *Alternate Flow*:
  
|     | Alternate Flow                                          | Description                                                                                                                                                                                             |
| --- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A1  | Invalid user details                                    | System asks customer to re-enter the user information and validates it or cancel the request       |
| A2  | Login through FaceBook or Google account                | Redirect to Facebook or google account login page and request account information including username/email and password to sign in using an existing third party account (google or facebook  |
| A3  | User cancels request                                    | User Cancels Request	At any time, the User may choose to cancel the account creation.  At this point, the processing is discontinued and the user is notified that the account management request has been cancelled.     |           

### 3. Buyer views a product and adds it to the shopping cart
3.1. *Author*: Eduard Moise

  3.2. *Description*: Buyer clicks on a product in order to view its details and proceeds to add it to the virtual shopping cart so they may continue shopping or check out.
  
  3.3. *Actor(s)*: Buyer
  
  3.4. *Preconditions*: 
  
     3.4.1. The CryptoMart system is running and working.
     
     3.4.2. The Client has successfully created a Buyer Profile.
     
     3.4.3. The Client is on the Market page.
     
  3.5. *Successful Post Conditions*: 
  
     3.5.1. The Client has successfully viewed and added a product to their shopping cart.
     
     3.5.2. Shopping cart has been saved in the database for future actions.
     
  3.6. *Business Rules*:
  
     3.6.1. They Buyer must not have marketplace restricitons (service ban) on their profile.

3.7. *Main Flow*:
 
|     | Buyer/Seller                                        | System                                                                      |
| --- | --------------------------------------------------- | --------------------------------------------------------------------------- |
| 1   | Sorts products by search criteria and or categories | Displays product listings accordingly                                       |
| 2   | Selects specific listed product                     | Loads new page and displays all information related to the selected product |
| 3   | Adds product to the shopping cart (A1)              | Saves shopping cart products in database ready for further actions          |

3.8. *Alternate Flow*:

|     | Alternate Flow                        | Description                        |
| --- | ------------------------------------- | ---------------------------------- |
| A1  | Does not add product to shopping cart | Displays previous product listings |

### 4. Seller adds an item to the market
4.1. *Author*: Daniel Perusse

  4.2. *Description*: Seller adds an item on the market to be purchased by a future client.
  
  4.3. *Actor(s)*: Seller
  
  4.4. *Preconditions*: The seller is currently logged in and has a wallet address.
     
  4.5. *Successful Post Conditions*: The seller successfully posts and item on the market for sale.
     
  4.6. *Business Rules*: The seller cannot put illegal goods for sale.

  4.7. *Main Flow*:
 
|     | Buyer/Seller                                                      |                                                                                    System |
| --- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| 1   | Click button to add an item for sale                              | Display add item page                                                                     |
| 2   | Fill in item name, description, type, weight, other details, etc. | Ask for item picture                                                                      |
| 3   | Selects an image from device (A3)                                 | Ask for selling method (Auction or Fixed price .A2 )                                      | 
| 4   | Seller sets method to auction (A2)                                | Ask for minimum price and number of days for auction                                      |
| 5   | Seller sets price and days                                        | Display example of item posting. Request confirmation of posting                          |
| 6   | Seller confirms his item.                                         | Display success screen and confirmation of item posting. Send an email to sellers address |  

4.8. *Alternate Flow*:
  
|     | Alternate Flow                    | Description                                                                                                                                                                        |
| --- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A1  | Seller cancels item posting       | At any time during the process, the seller may decide to cancel putting the item for sale                                                                                          |
| A2  | Seller sets method to fixed price | Instead of auctioning the item, the user can choose to sell it to any client who is willing to pay upfront. The Seller can also list how much of said item is available for sale. |
