import {Usuario} from "../entity/Usuario";
import {getRepository} from "typeorm";

export function guardarRegistro() {

}

export function obtenerTodosRegistro(): Promise<[Usuario[], number]> {
    return Usuario.findAndCount()
}

export function buscarRegistros(telefono: string): Promise<Usuario | undefined> {
    console.log('telefono: ', telefono)
    return getRepository(Usuario).createQueryBuilder('usuario')
        .where('usuario.telefono = :telefono', {telefono}).getOne()
}

export function guardarUsuario(usuario: Usuario): Promise<Usuario> {
    return usuario.save()
}
