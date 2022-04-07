export class ShoppingCartItem {
    userId: string = "";
    sellerId: string = ''; // userId of seller in database
    itemId: string = "";
    firstName: string = ""; // Seller's first name
    title: string = "";
    price: number = 0;
    description: string = "";
    images: string[] = [];
    color?: any;
    size?:any;
    quantity: number = 1;
    shippingOption:any;
}  