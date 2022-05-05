import Schema from "mongoose";
import MongoContenedor from "../../contenedor/MongoContenedor.js";

export default class CartsMongo extends MongoContenedor {

    constructor() {
        super(
            "carts",
            {
                products: {
                    type: [{
                        type: String,
                        ref: "products"
                    }],
                    default: []
                },
                user: { 
                    type: Schema.Types.ObjectId, 
                    ref: "user"
                }
            },
            {timestamps: true}
        )
    }

}