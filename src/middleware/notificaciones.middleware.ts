import {Usuario} from "../entity/Usuario";
import {buscarRegistros, guardarUsuario, obtenerTodosRegistro} from "../models/notificacion.model";
import {respuesta} from "../helpers/funcionesGenerales";
import ExpoNotificaciones from "../helpers/ExpoNotificaciones";

export async function enviarNotificaciones(request, response) {
    try{
        console.log('request: ', request.body)
        const usuario = await buscarRegistros(request.body.telefono)
        if (usuario){
            const expoService = new ExpoNotificaciones()
            await expoService.notificarTelefono(usuario, request.body.mensaje)
            respuesta(response, 200, 'Notificacion enviada con exito', {})
        }
        respuesta(response, 400, 'No se encontro el numero en nuestros registros', {})
    }catch (e) {
        respuesta(response, 500, 'Ocurrio un error inesperado', {error: e.toString()})
    }
}

export async function registrarUsuario(request, response) {
    try {
        const nuevoUsuario = await guardarUsuario(new Usuario(request.body))
        respuesta(response, 201, 'Usuario registrado con exito', nuevoUsuario)
    } catch (e) {
        respuesta(response, 500, 'Ocurrio un error inesperado', {error: e.toString()})
    }
}

export async function notificarTodosUsuarios(request, response) {
    try {
        const [usuarios, totalUsuarios] = await obtenerTodosRegistro()
        const expo = ExpoNotificaciones.getInstance()
        await expo.notificarTodos(usuarios)
        respuesta(response, 200, 'Notificacion enviada con exito', {})
    } catch (e) {
        respuesta(response, 500, 'Ocurrio un error inesperado', {error: e.toString()})
    }
}
