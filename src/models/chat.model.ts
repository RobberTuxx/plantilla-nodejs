import {getRepository} from "typeorm";
import {Chat} from "../entity/Chat";
import {WebhookInterface} from "../Interfaces/Webhook.Interface";

export function buscarChatActivo(mensaje: WebhookInterface): Promise<Chat | undefined> {
    return getRepository(Chat).createQueryBuilder('chat')
        .leftJoinAndSelect('chat.usuario', 'usuario')
        .where('chat.destinatario = :destinatario', {destinatario: mensaje.to.number})
        .andWhere('chat.remitente = :remitente', {remitente: mensaje.from.number})
        .getOne()
}

export function buscarChatActivoID(id: string): Promise<Chat>{
    return Chat.findOne(id)
}

export function conteoUsuariosChat(destinatario: string): Promise<any[]>{
    return getRepository(Chat).createQueryBuilder('chat')
        .select("chat.usuario , COUNT(chat.usuario)", 'conteo')
        .groupBy('chat.usuario')
        .where({destinatario}).getRawMany()
}

export function guardarChat(chat: Chat){
    return chat.save()
}
