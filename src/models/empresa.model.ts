import {Empresa} from "../entity/Empresa";
import {getRepository} from "typeorm";

export function guardarEmpresa(empresa: Empresa) {
    return empresa.save()
}

export function buscarEmpresaId(id: number) {
    return getRepository(Empresa).createQueryBuilder('empresa')
        .leftJoinAndSelect('empresa.configuracionEmpresa', 'configuracionEmpresa')
        .where({id}).getOne()
}

export function buscarEmpresaTelefono(telefono: string) {
    return getRepository(Empresa).createQueryBuilder('empresa')
        .leftJoinAndSelect('empresa.configuracionEmpresa', 'configuracion')
        .where('configuracion.whatsapp = :telefono', {telefono}).getOne()
}
