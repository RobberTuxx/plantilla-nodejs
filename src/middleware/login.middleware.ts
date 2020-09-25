import {validationResult} from "express-validator";
import {generarToken, respuesta, status} from "../helpers/funcionesGenerales";
import * as bcrypt from 'bcrypt';
import {buscarUsuario} from "../models/usuario.model";

export async function logIn(request, response) {
    console.log('we')
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return respuesta(response, status.unprocesable, 'Faltan datos por completar', {errors: errors.array()});
    }
    try {
        const usuario = await buscarUsuario(request.body.email);
        if (usuario) {
            const passwordValido = await bcrypt.compare(request.body.password, usuario.password)
            if (passwordValido) {
                return respuesta(response, status.success, `Bienvenido ${usuario.nombre + ' ' + usuario.apellidoPaterno}`, {
                    usuario: {
                        email: request.body.email,
                        token: generarToken(usuario)
                    }
                })
            }
        }
        return respuesta(response, status.bad, 'El usuario y/o contraseña ingresada, son incorrectos', {})
    } catch (e) {
        return respuesta(response, status.error, 'Error en servidor', {reason: e + ''});
    }
}
