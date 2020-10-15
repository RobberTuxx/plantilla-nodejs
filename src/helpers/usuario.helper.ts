import {body} from "express-validator";
import {Usuario} from "../entity/Usuario";
import {actualizarUsuario} from "../models/usuario.model";

export const validarUsuario = [
    body('email', 'El formato del correo es invalido, favor de revisar').isEmail(),
    body('email', 'El correo no puede estar vacio').notEmpty(),
    body('password', 'El password no puede estar vacio').notEmpty(),
    body('telefono', 'El telefono del usuario no puede estar vacio').notEmpty(),
    body('nombre', 'El nombre del usuario no puede estar vacio').notEmpty(),
]

export function actualizarPushToken(usuario: Usuario, token: string) {
    return new Promise(async (resolve, reject) => {
        try {
            if (token) {
                usuario.pushToken = token
                const actualizacion = await actualizarUsuario(usuario)
                if (actualizacion.affected === 0) {
                    return reject('No se actualizo el usuario')
                }
                resolve('Usuario actualizado con exito!')
            }
            resolve('Todo correcto')
        } catch (e) {
            reject(e.toString())
        }
    })
}
