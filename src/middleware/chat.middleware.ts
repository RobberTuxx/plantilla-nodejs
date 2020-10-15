import {MensajeSaliente} from "../Interfaces/Chat.Interface";
import {crearConversacion} from "../helpers/chat.helper";
import {buscarChatActivoID} from "../models/chat.model";
import {MensajeText} from "../Interfaces/Whastapp.Inteface";
import {enviarWhatsappTexto} from "../Services/Vonage/VonageWhatsapp";
import {respuesta, status} from "../helpers/funcionesGenerales";

export async function mensajeSaliente(request, response) {
    try {
        const mensaje = request.body as MensajeSaliente
        const chat = await buscarChatActivoID(mensaje.chatId)
        await crearConversacion(chat, mensaje.mensaje)
        const mensajeEnviar = {mensaje: mensaje.mensaje, remitente: chat.remitente, destinatario: chat.destinatario} as MensajeText
        const respuestaWhatsapp = await enviarWhatsappTexto(mensajeEnviar)
        console.log('respuesta whatsapp: ', respuestaWhatsapp.data)
        return respuesta(response, status.created, 'Mensaje enviado con exito!', {})
    }catch (e) {
        return respuesta(response, status.error, "Oops!, esto no deberia de pasar, no se pudo enviar el mensaje", {error: e.toString()})
    }
}
