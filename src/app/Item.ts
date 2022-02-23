export class Item {
    userId: string = ""; // userId of seller in database
    firstName: string = ""; // Seller's first name
    title: string = "";
    price: number = 0;
    description: string = "";
    images: string[] = [];
    colors?: any;
    sizes?:any;
    parameters?:any; // custom parameters to be displayed on product page
    shippingOption?:any;
}  