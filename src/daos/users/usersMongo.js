import MongoContenedor from "../../contenedor/MongoContenedor.js";

export default class UsersMongo extends MongoContenedor {

    constructor() {
        super(
            "users",
            {
                email: {type: String, required: true},
                name: {type: String, required: true},
                password: {type: String, required: true},
                address: {type: String, required: true},
                age: {type: Number, required: true},
                phone: {type: String, required: true},
                avatar: {type: String, required: true},
                role: {type: String, required: true}
            },
            {timestamps: true}
        )
    }

}


