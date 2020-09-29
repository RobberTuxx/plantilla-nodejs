import {ConfiguracionEmpresa} from "../entity/ConfiguracionEmpresa";
import {getRepository, UpdateResult} from "typeorm";

export function actualizarConfiguracionEmpresa(configuracion: ConfiguracionEmpresa): Promise<UpdateResult>{
    return getRepository(ConfiguracionEmpresa).update(configuracion.id, configuracion)
}
