# Crypto Mart Marketplace
##### Seneca College Capstone Project

Members
|   Member Name   | Github Account  |             Email               |
| --------------- | --------------- | ------------------------------- |
| Radu Cernatescu | radu-cernatescu | rcernatescu@myseneca.ca         |
| Eduard Moise    | 2Lich           | emoise@myseneca.ca              |
| Charmi Darji    | charmi2000      | cbdarji@myseneca.ca             |

# Project Description

Name: **CryptoMart**

In this project, a web based marketplace will be developed. The website will act as a platform where users can post whatever items they are trying to sell and other users may purchase them. The seller is responsible for shipping or other transportation costs to get their item to their buyer (if the item is physical). Transactions will occur using a cryptocurrency called Bitcoin Cash, which has very low transaction fees and is easily obtainable/exchangeable from fiat.

The marketplace will act as a middle man and *possibly* have an escrow system to ensure that neither buyers nor sellers are scammed. First the marketplace ensures funds are recieved from the buyer, withholds them from the seller, then waits for a response from the buyer whether or not they have recieved their item in the mail, then releases funds to seller.

## Buying

Buying starts at the home page where the user can search for a product by entering either a description, brand, category, or product name in the search tool. Moreover, the search tool will include advanced filter options such as sorting by price, reviews, delivery time and many more.

Then the application displays all the products that match the user’s criteria along with a brief description and price. The user can choose to either add the product to their cart where said product can be purchased or click "Info" for more product information. The Shopping Cart feature allows the buyer to keep a track of all the items they wish to purchase. In addition, it also allows the user to remove or add new products to the list. The total price changes accordingly.

When satisfied, the buyer can then proceed to the payment page where they can check out their shopping cart with the appropriate cryptocurrency.

## Selling

First, for an account to be eligible as a seller, it must be protected by 2-Factor-Authentification (2FA). Then, the user must state their interest in becoming a seller by completing a simple consent form. Lastly, the seller must indicate what delivery companies are in their area.

When the account processing is complete, the seller will be shown a page called "My Shop" which will display all items put up for sale by the user. Furthermore, the "My Shop" page allows for adding and removing offers. Seeing the "My Shop" page finalizes seller account creation.

Another available tool to sellers is the "Offers" page under "My Shop". When accessing the "Offers" page the seller can see user negotiations which may involve a different cryptocurrency being paid for the item. Sellers can accept or decline offers depending on their own interests.

### Putting Items For Sale:

The seller must first take a minimum of 4 accurate photos of the product. The photos must be at least 1280 x 720p in resolution for them to be considered as accurate.

Once product evidence is sufficient, the seller must state the product's price in their preffered fiat currency (i.e. CAD, USD, EUR, CHF, etc). The seller chooses their asking price in a fiat currency, due to the high volatility of cryptocurrencies, so that the asking price of an item is not pegged to a quickly moving crypto market. Instead, when a buyer chooses an item that costs 25 USD for example, that value will be converted, using an API, to whatever the crypto equivalent of 25 USD is.

## Transacting in cryptocurrency

If the buyer has only one item in their shopping cart, then they are simply given the address of the seller's crypto wallet, where the buyer will deposit the necessary amount, determined by the value of the given crypto at that time (using an API). The marketplace will also keep track of whether the money is received and how many confirmations it has using APIs.

If the buyer has multiple items in their shopping cart, then they are given multiple addresses where they are required to make payment to. We hope to have enough time to implement a solution where the buyer would send the amount of their shopping cart total to a specific wallet address belonging to the marketplace which would then distribute the crypto recieved from the buyer to the sellers accordingly.

After receipt of the item (if physical), the buyer would need to finalize their order, to release the escrow funds that were on hold by the marketplace. The buyer has 14 days to finalize their order after which it is automatically finalized, if there are no disputes.
