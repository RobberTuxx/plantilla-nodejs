import {Usuario} from "../entity/Usuario";
import {getRepository} from "typeorm";

export function buscarUsuario(email: string):Promise<Usuario|undefined>{
    return getRepository(Usuario).findOne({where: {email}})
}
