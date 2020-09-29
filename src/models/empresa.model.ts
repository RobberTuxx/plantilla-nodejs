import {Empresa} from "../entity/Empresa";
import {getRepository} from "typeorm";

export function guardarEmpresa(empresa: Empresa) {
    return empresa.save()
}

export function buscarEmpresaId(id: number) {
    return getRepository(Empresa).createQueryBuilder('empresa')
        .leftJoinAndSelect('empresa.configuracionEmpresa','configuracionEmpresa')
        .where({id}).getOne()
}
