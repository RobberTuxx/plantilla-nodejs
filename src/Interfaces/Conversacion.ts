import {Chat} from "../entity/Chat";

export interface ConversacionInterface {
    id: string
    mensaje: string
    remitente: boolean
    chat: Chat
}
