import {TelefonoBloqueado} from "../entity/TelefonoBloqueado";
import {respuesta, status} from "../helpers/funcionesGenerales";
import {guardarTelefono} from "../models/telefonoBloqueado.model";
import {validationResult} from "express-validator";

export async function agregarTelefono(request, response) {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return respuesta(response, status.unprocesable, 'Uno o mas telefonos no son validos, favor de revisar e intentar de nuevo', {errors: errors.array()});
    }
    const telefonos = request.body.telefonos as string[]
    try {
        const telefonosCreados = telefonos.map(telefono => {
            const nuevoTelefono = new TelefonoBloqueado({telefono})
            console.log("empresa: ",nuevoTelefono )

            nuevoTelefono.empresa.id = request["empresaID"]
            return guardarTelefono(nuevoTelefono)
        })
        await Promise.all(telefonosCreados)
        return respuesta(response, status.created, "Telefonos añadidos correctamente", {})
    } catch (e) {
        return respuesta(response, status.error, "Oops!, esto no deberia de pasar, no se pudo guardar los telefonos", {error: e.toString()})
    }
}
