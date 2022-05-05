import twilio from "twilio";
import createLogger from "./logger.js";
import {envConfig} from "../../config/envConfig.js";

const sid = envConfig.TWILIO_SID;
const token = envConfig.TWILIO_TOKEN;
const client = twilio(sid, token);
const logger = createLogger(envConfig.NODE_ENV);

try {
    let result = await client.messages.create({
        from: `whatsapp:${envConfig.TWILIO_WHATSAPP}`,
        to: `whatsapp:${envConfig.TWILIO_WHATSAPP_VERIFIED}`,
        body: "Prueba de Whatsapp con Twilio",
        //Para enviar imágenes puedo poner coma y adjuntar más// 
        mediaUrl: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZe8xjSlSEI8a1SK92Jay9sPqJXumdLkVAAg&usqp=CAU"]
    })
    logger.info(`Whatsapp enviado: ${result}`);
    //console.log(result);
} catch(error) {
    logger.error(`Ha fallado el envío de whatsapp: ${error}`);
    //console.log(error);
}