import {Usuario} from "../entity/Usuario";
import {getRepository} from "typeorm";

export function buscarUsuario(email: string): Promise<Usuario | undefined> {
    return Usuario.findOne({where: {email}, relations: ["rol", "empresa"]})
}

export function buscarUsuarioID(id: number): Promise<Usuario | undefined> {
    return Usuario.findOne({where: {id}})
}
export function guardarUsuario(usuario: Usuario): Promise<Usuario> {
    return usuario.save()
}

export function obtenerTodosUsuarios(empresaId: number){
    return getRepository(Usuario).createQueryBuilder('usuario')
        .leftJoinAndSelect('usuario.rol', 'rol')
        .where('usuario.empresa = :empresaId', {empresaId})
        .andWhere('usuario.pushToken is not null')
        .andWhere('rol.id = :id',{id: 3})
        .getManyAndCount()
}
