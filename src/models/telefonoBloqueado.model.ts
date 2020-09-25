import {TelefonoBloqueado} from "../entity/TelefonoBloqueado";

export function guardarTelefono(telefono: TelefonoBloqueado){
    return telefono.save()
}
