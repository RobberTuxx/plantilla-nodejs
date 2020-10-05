import {Usuario} from "../entity/Usuario";
import {getRepository} from "typeorm";

export function buscarUsuario(email: string): Promise<Usuario | undefined> {
    return Usuario.findOne({where: {email}, relations: ["rol", "empresa"]})
}

export function guardarUsuario(usuario: Usuario): Promise<Usuario> {
    return usuario.save()
}

export function obtenerTodosUsuarios(empresaId: number){
    return getRepository(Usuario).createQueryBuilder('usuario')
        .where('usuario.empresaId = :empresaId', {empresaId})
        .andWhere('usuario.rol = :id',{id: 3})
        .getManyAndCount()
}
