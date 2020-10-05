import ServiceNexmo from "../ServiceNexmo";
import {MensajeText, WhatsappAV, WhatsappImagenFile} from "../../Interfaces/Whastapp.Inteface";

export function enviarWhatsappTexto(mensaje: MensajeText) {
    return ServiceNexmo.post('/v0.1/messages', {
        "to": {"type": "whatsapp", "number": mensaje.destinatario},
        "from": {"type": "whatsapp", "number": mensaje.remitente},
        "message": {
            "content": {
                "type": "text",
                "text": mensaje.mensaje
            }
        }
    })
}

export function enviarWhatsappImagen(mensaje: WhatsappImagenFile) {
    return ServiceNexmo.post('/v0.1/messages', {
        "to": {"type": "whatsapp", "number": mensaje.destinatario},
        "from": {"type": "whatsapp", "number": mensaje.remitente},
        "message": {
            "content": {
                "type": "image",
                "image": {
                    "url": mensaje.urlImagen,
                    "caption": mensaje.mensaje
                }
            }
        }
    })
}

export function enviarWhatsappArchivo(mensaje: WhatsappImagenFile) {
    return ServiceNexmo.post('/v0.1/messages', {
        "to": {"type": "whatsapp", "number": mensaje.destinatario},
        "from": {"type": "whatsapp", "number": mensaje.remitente},
        "message": {
            "content": {
                "type": "file",
                "file": {
                    "url": mensaje.urlImagen,
                    "caption": mensaje.mensaje
                }
            }
        }
    })
}

export function enviarWhatsappAudio(mensaje: WhatsappAV) {
    return ServiceNexmo.post('/v0.1/messages', {
        "to": {"type": "whatsapp", "number": mensaje.destinatario},
        "from": {"type": "whatsapp", "number": mensaje.remitente},
        "message": {
            "content": {
                "type": "audio",
                "audio": {
                    "url": mensaje.urlAV,
                }
            }
        }
    })
}

export function enviarWhatsappVideo(mensaje: WhatsappAV) {
    return ServiceNexmo.post('/v0.1/messages', {
        "to": {"type": "whatsapp", "number": mensaje.destinatario},
        "from": {"type": "whatsapp", "number": mensaje.remitente},
        "message": {
            "content": {
                "type": "video",
                "video": {
                    "url": mensaje.urlAV,
                }
            }
        }
    })
}
