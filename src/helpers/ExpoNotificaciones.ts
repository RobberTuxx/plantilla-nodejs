import {Usuario} from "../entity/Usuario";
import {Expo, ExpoPushTicket} from 'expo-server-sdk';
// @ts-ignore
import {ExpoPushMessage} from "expo-server-sdk/src/ExpoClient";

class ExpoNotificaciones {
    private static instance: ExpoNotificaciones;
    expo: Expo

    constructor() {
    }

    public static getInstance(): ExpoNotificaciones {
        if (!ExpoNotificaciones.instance) {
            ExpoNotificaciones.instance = new ExpoNotificaciones()
        }
        return ExpoNotificaciones.instance
    }

    async notificarTodos(usuarios: Usuario[]) {
        const mensajes = usuarios.map(usuario => {
            return {
                to: usuario.pushToken,
                sound: 'default',
                body: 'esto es una prueba',
                data: {datos: 'Sin miedo al exito'}
            } as ExpoPushMessage
        })
        const chucks = this.expo.chunkPushNotifications(mensajes)
        const tikets = []
        for (const chuck of chucks) {
            try {
                const ticket = await this.expo.sendPushNotificationsAsync(chuck)
                tikets.push(ticket)
                console.log('ticket: ', ticket)
            } catch (e) {
                console.error(e)
            }
        }
    }
    async notificarTelefono(usuario: Usuario, mensaje: string){
        const notificacion = [{
            to: usuario.pushToken,
            sound: 'default',
            title: usuario.nombre,
            body: mensaje,
            data: {datos: 'Sin miedo al exito'}
        } as ExpoPushMessage]
        const chucks = this.expo.chunkPushNotifications(notificacion)
        for (const chuck of chucks) {
            try {
                const ticket = await this.expo.sendPushNotificationsAsync(chuck)
                console.log('ticket: ', ticket)
            } catch (e) {
                console.error(e)
            }
        }
    }
}

export default ExpoNotificaciones
