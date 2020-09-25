import {Usuario} from "../entity/Usuario";

export function buscarUsuario(email: string):Promise<Usuario|undefined>{
    return Usuario.findOne({where: {email}, relations:["rol", "empresa"]})
}
