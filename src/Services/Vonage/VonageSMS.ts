import {MensajeText} from "../../Interfaces/Whastapp.Inteface";
import ServiceNexmo from "../ServiceNexmo";

export function enviarSMSTexto(mensaje: MensajeText) {
    return ServiceNexmo.post('/v0.1/messages', {
        "to": {"type": "sms", "number": mensaje.destinatario},
        "from": {"type": "sms", "number": mensaje.remitente},
        "message": {
            "content": {
                "type": "text",
                "text": mensaje.mensaje
            }
        }
    })
}
