import {actualizarUsuario, buscarUsuarioID} from "../models/usuario.model";

export function usuarioSocket(id: number, socket: string) {
    return new Promise(async (resolve, reject) => {
        try {
            if (id) {
                const usuario = await buscarUsuarioID(id)
                usuario.socketId = socket
                const usuarioActualizado = await actualizarUsuario(usuario)
                if (usuarioActualizado.affected !== 0) {
                    return resolve('Usuario actualizado')
                }
                reject('El usuario no pudo ser actualizado')
            }
            resolve()
        } catch (e) {
            reject(e.toString())
        }
    })
}

export function desconexionUsuario(id: number) {
    return new Promise(async (resolve, reject) => {
        try {
            const usuario = await buscarUsuarioID(id)
            usuario.socketId = null
            const usuarioActualizado = await actualizarUsuario(usuario)
            if (usuarioActualizado.affected !== 0) {
                return resolve('Usuario actualizado')
            }
            reject('El usuario no puede ser actualizado: ')
        } catch (e) {
            reject(e.toString())
        }
    })
}
