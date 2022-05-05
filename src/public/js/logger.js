import winston from "winston";
const {combine, timestamp, json} = winston.format;
import __dirname from "../../utils.js";

const createLogger = (env) => {
    //if (env === "dev") {
        return winston.createLogger({
            format: combine(
                timestamp(),
                json()
            ),
            transports: [
                new winston.transports.File({filename: "./src/warns.log", level: "warn"}),
                new winston.transports.File({filename: "./src/errors.log", level: "error"}),
                new winston.transports.Console({level: "info"})
            ]
        })
    // } else {
    //     return winston.createLogger({
    //         format: combine(
    //             timestamp(),
    //             json()
    //         ),
    //         transports: [
    //             new winston.transports.Console({level: "all"})
    //         ]
    //     })
    // }
}

export default createLogger;