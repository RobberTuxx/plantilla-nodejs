import {validationResult} from "express-validator";
import {generarToken, respuesta, status} from "../helpers/funcionesGenerales";
import * as bcrypt from 'bcrypt';
import {buscarUsuario} from "../models/usuario.model";
import NexmoClass from "../Services/Nexmo";
import {enviarWhatsappTexto} from "../Services/Vonage/VonageWhatsapp";
import {MensajeText} from "../Interfaces/Whastapp.Inteface";

export async function logIn(request, response) {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return respuesta(response, status.unprocesable, 'Faltan datos por completar', {errors: errors.array()});
    }
    try {
        const usuario = await buscarUsuario(request.body.email);
        if (usuario) {
            const passwordValido = await bcrypt.compare(request.body.password, usuario.password)
            if (passwordValido) {
                delete usuario.password
                const nexmo = NexmoClass.getInstance()
                const mensaje = {mensaje: 'que onda perro como estamos', destinatario:'5219515078041', remitente:'14157386170'} as MensajeText
                const respuestaWhatsapp = await enviarWhatsappTexto(mensaje)
                console.log('resss: ', respuestaWhatsapp.data)
                return respuesta(response, status.success, `Bienvenido ${usuario.nombre + ' ' + usuario.apellidoPaterno}`, {
                    usuario,
                    token: generarToken(usuario)
                })
            }
        }
        return respuesta(response, status.bad, 'El usuario y/o contraseña ingresada, son incorrectos', {})
    } catch (e) {
        return respuesta(response, status.error, 'Error en servidor', {reason: e + ''});
    }
}
