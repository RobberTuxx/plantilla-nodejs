import {Conversacion} from "../entity/Conversacion";

export function agregarConversacion(conversacion: Conversacion) {
    return conversacion.save()
}
