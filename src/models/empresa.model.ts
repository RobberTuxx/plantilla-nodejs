import {Empresa} from "../entity/Empresa";

export function guardarEmpresa(empresa: Empresa){
    return empresa.save()
}
