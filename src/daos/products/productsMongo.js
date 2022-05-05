import MongoContenedor from "../../contenedor/MongoContenedor.js";

export default class ProductsMongo extends MongoContenedor {
    constructor() {
        super(
            "products",
            {
                title: {type: String, required: true},
                brand: {type: String, required: true},
                code: {type: String, required: true},
                price: {type: Number, required: true},
                stock: {type: Number, required: true},
                description: {type: String, required: true},
                gender: {type: String, required: true},
                thumbnail: {type: String, required: true}
            },
            {timestamps: true}
        )
    }
}