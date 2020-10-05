import {respuesta, status} from "../helpers/funcionesGenerales";

export function estatusMensaje(request, response){
    console.log('webhook: ', request.body)
    return respuesta(response, status.success, 'ok', {})
}
