# Group15

Members
|   Member Name   | Github Account  |             Email               |
| --------------- | --------------- | ------------------------------- |
| Radu Cernatescu | radu-cernatescu | rcernatescu@myseneca.ca         |
| Eduard Moise    | 2Lich           | emoise@myseneca.ca              |
| Charmi Darji    | charmi2000      | cbdarji@myseneca.ca             |
| Daniel Perusse  | MapleTaco       | dperusse@myseneca.ca            |

# Project Description

In this project, a web based marketplace will be developed. The website will act as a platform where users can post whatever items they are trying to sell and other users may purchase them. The seller is responsible for shipping or other transportation costs to get their item to their buyer (if the item is physical). Transactions will occur using cryptocurrencies such as Bitcoin, Bitcoin Cash, Dogecoin and possibly more.

The marketplace will act as a middle man and *possibly* have an escrow system to ensure that neither buyers nor sellers are scammed. First the marketplace ensures funds are recieved from the buyer, withholds them from the seller, then waits for a response from the buyer whether or not they have recieved their item in the mail, then releases funds to seller.

## Buying

The Buying module starts at the home page where the user can search for a product by entering a term or browsing through various categories of products. It also allows the user to filter the search based on parameters like price, estimated delivery time etc. 

Next, the application displays all the products that match the user’s criteria along with a brief description and price. The user can choose to buy or add the product to their Shopping Cart. The Shopping Cart feature allows the buyer to keep a track of all the items they wish to purchase. In addition, it also allows the user to remove or add new products to the list. The total price changes accordingly.

Final step is proceeding to the payment/transaction module.

## Selling

## Transacting in cryptocurrency

If the buyer has only one item in their shopping cart, then they are simply given the address of the seller's crypto wallet, where the buyer will deposit the necessary amount, determined by the value of the given crypto at that time (using an API). The marketplace will also keep track of whether the money is received and how many confirmations it has using APIs.

If the buyer has multiple items in their shopping cart, then they are given multiple addresses where they are required to make payment to. We hope to have enough time to implement a solution where the buyer would send the amount of their shopping cart total to a specific wallet address belonging to the marketplace which would then distribute the crypto recieved from the buyer to the sellers accordingly.

After receipt of the item (if physical), the buyer would need to finalize their order, to release the escrow funds that were on hold by the marketplace. The buyer has 14 days to finalize their order after which it is automatically finalized, if there are no disputes.
