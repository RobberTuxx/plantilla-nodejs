import {Empresa} from "../entity/Empresa";
import {guardarEmpresa} from "../models/empresa.model";
import {respuesta, status} from "../helpers/funcionesGenerales";

export async function crearEmpresa(request, response) {
    const empresa = new Empresa(request.body)
    try {
        const empresaCreada = await guardarEmpresa(empresa)
        return respuesta(response, status.created, "La nueva empresa se creo con exito", {empresa: empresaCreada})
    } catch (e) {
        return respuesta(response, status.error, "Oops!, esto no deberia de pasar, no se pudo guardar la empresa", {error: e.toString()})
    }
}
