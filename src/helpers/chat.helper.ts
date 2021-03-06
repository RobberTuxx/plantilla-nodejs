import {WebhookInterface} from "../Interfaces/Webhook.Interface";
import {conteoUsuariosChat, guardarChat} from "../models/chat.model";
import {Chat} from "../entity/Chat";
import {buscarUsuarioID, obtenerTodosUsuarios} from "../models/usuario.model";
import {buscarEmpresaTelefono} from "../models/empresa.model";
import {Conversacion} from "../entity/Conversacion";
import {Usuario} from "../entity/Usuario";
import ExpoNotificaciones from "./ExpoNotificaciones";
import {io} from "../server";

interface conteoChat {
    usuarioId: number
    conteo: string
}

export async function crearChat(mensaje: WebhookInterface) {
    return new Promise(async (resolve, reject) => {
        try {
            const empresa = await buscarEmpresaTelefono(mensaje.to.number)
            console.log('la empresa: ', empresa)
            const [usuarios, total] = await obtenerTodosUsuarios(empresa.id)
            if (total === 0){
                return resolve('No hay usuarios activos')
            }
            console.log('usuarios: ', usuarios)
            const chats = await conteoUsuariosChat(mensaje.to.number) as conteoChat[]
            const nuevoChat = await construirNuevoChat(mensaje)
            if (usuarios.length) {
                chats.length ?
                    nuevoChat.usuario = balanceMensajeUsuario(usuarios, chats) :
                    nuevoChat.usuario = usuarios[Math.floor(Math.random()) * (usuarios.length - 1)]
            }
            await guardarChat(nuevoChat)
            const expo = ExpoNotificaciones.getInstance()
           // await expo.notificarTelefono(nuevoChat.usuario, mensaje.message.content.text)

        } catch (e) {
            reject('Error: ' + e.toString())
        }
    })
}

export function construirNuevoChat(mensaje: WebhookInterface): Chat {
    return new Chat({
        remitente: mensaje.from.number,
        destinatario: mensaje.to.number,
        conversacion: [new Conversacion({
            mensaje: mensaje.message.content.text,
            remitente: true
        })]
    })
}

export async function crearConversacion(chatActivo: Chat, mensajeEntrante: string) {
    const expo = ExpoNotificaciones.getInstance()
    return new Promise(async (resolve, reject) =>{
        try{
            console.log('usuario: ', chatActivo)
            const usuario = await buscarUsuarioID(chatActivo.usuario.id)
            const socketId = mensajeEntrante

            const conversacion = await Conversacion.create({
                mensaje: mensajeEntrante,
                remitente: true,
                chat: chatActivo
            }).save()
            io.to(socketId).emit('hey', conversacion)
            await expo.notificarTelefono(usuario, mensajeEntrante)
            resolve('Todo correcto')
        }catch (e) {
            reject('Error: ' + e.toString())
        }
    })
}

function balanceMensajeUsuario(usuarios: Usuario[], chatsActivos: conteoChat[]): Usuario {
    const usuariosTotal = usuarios.map(value => {
        for (let i = 0; i < chatsActivos.length; i++) {
            if (value.id === chatsActivos[i].usuarioId) {
                return {usuario: value.id, total: parseInt(chatsActivos[i].conteo)}
                break
            }
        }
        return {usuario: value.id, total: 0}
    })
    usuariosTotal.sort(function (a, b) {
        return a.total - b.total
    })
    return usuarios.find(value => value.id === usuariosTotal[0].usuario)
}
