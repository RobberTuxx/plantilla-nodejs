import {respuesta, status} from "../helpers/funcionesGenerales";
import {WebhookInterface} from "../Interfaces/Webhook.Interface";
import {buscarChatActivo} from "../models/chat.model";
import {crearChat, crearConversacion} from "../helpers/chat.helper";

export function estatusMensaje(request, response) {
    console.log('webhook: ', request.body)
    return respuesta(response, status.success, 'ok', {})
}

export async function mensajeEntrante(request, response) {
    const mensajeEntrante = request.body as WebhookInterface
    try {
        const chatActivo = await buscarChatActivo(mensajeEntrante)
        chatActivo ?
            await crearConversacion(chatActivo, mensajeEntrante.message.content.text) :
            await crearChat(mensajeEntrante)
        return respuesta(response, status.created, 'mensaje guardado', {})
    } catch (e) {
        console.log('error: ', e.toString())
        return respuesta(response, status.error, 'error', {error: e.toString()})
    }
    return respuesta(response, status.success, 'ok', {})
}
