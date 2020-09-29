import {actualizarConfiguracionEmpresa} from "../models/configuracionEmpresa.model";
import {respuesta, status} from "../helpers/funcionesGenerales";
import {buscarEmpresaId} from "../models/empresa.model";
import {validationResult} from "express-validator";

export async function agregarMensajes(request, response) {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return respuesta(response, status.unprocesable, 'Faltan datos por completar', {errors: errors.array()});
    }
    try {
        const empresa = await buscarEmpresaId(request["empresaID"])
        empresa.configuracionEmpresa.mensajesComprados += parseInt(request.body.mensajes)
        const configuracionActualizada = await actualizarConfiguracionEmpresa(empresa.configuracionEmpresa)
        configuracionActualizada.affected !== 0 ?
            respuesta(response, status.success, 'Los mensajes fueron agregados con exito!', {})
            :
            respuesta(response, status.error, 'No se pudo actualizar el cliente', {error: configuracionActualizada})
    } catch (e) {
        return respuesta(response, status.bad, 'Oops!, esto no deberia de pasar, no se pudo actualizar los mensajes', {error: e.toString()})
    }
}
