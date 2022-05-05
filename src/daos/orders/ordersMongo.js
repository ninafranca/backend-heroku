import Schema from "mongoose";
import MongoContenedor from "../../contenedor/MongoContenedor.js";

export default class OrdersMongo extends MongoContenedor {

    constructor() {
        super(
            "orders",
            {
                products: {
                    type: [{
                        type: String,
                        ref: "products"
                    }],
                    default: []
                },
                user: {type: String, required: true}
            },
            {timestamps: true}
        )
    }

}