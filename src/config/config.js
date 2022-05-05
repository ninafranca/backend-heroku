import __dirname from "../utils.js";
import {envConfig} from "./envConfig.js";

export default {
    mongo: {
        baseUrl: envConfig.MONGO_ECOMMERCE
    }
}