let products;
let carts;
let chats;
let users;
let orders;

{
    const {default: ProductsMongo} = await import("./products/productsMongo.js");
    const {default: CartsMongo} = await import("./carts/cartsMongo.js");
    const {default: ChatsMongo} = await import("./chats/chatsMongo.js");
    const {default: UsersMongo} = await import("./users/usersMongo.js");
    const {default: OrdersMongo} = await import("./orders/ordersMongo.js");
    products = new ProductsMongo();
    carts = new CartsMongo();
    chats = new ChatsMongo();
    users = new UsersMongo();
    orders = new OrdersMongo();
}

export {products, carts, chats, users, orders};