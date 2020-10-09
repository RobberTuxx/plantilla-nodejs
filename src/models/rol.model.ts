import {Rol} from "../entity/Rol";
import {getRepository} from "typeorm";

export function buscarRol(id: number): Promise<Rol>{
    return getRepository(Rol).createQueryBuilder('rol').where({id}).getOne()
}
