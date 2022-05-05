import twilio from "twilio";
import createLogger from "./logger.js";

const sid = process.env.TWILIO_SID;
const token = process.env.TWILIO_TOKEN;
const client = twilio(sid, token);
const logger = createLogger(process.env.NODE_ENV);

try {
    const message = await client.messages.create({
        body: "Prueba de Twilio",
        from: process.env.TWILIO_TRIAL,
        to: process.env.TWILIO_VERIFIED
    });
    logger.info(`Sms enviado: ${message}`);
    //console.log(message);
} catch(error) {
    logger.error(`Fallo al enviar sms: ${error}`);
    console.log(error);
}