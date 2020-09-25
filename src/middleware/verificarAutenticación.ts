import {obtenerIDEmpresa, respuesta, status, tokenExpirado} from "../helpers/funcionesGenerales";

export function verificarToken(request, response, next) {
    if (!request.headers.authorization){
        return respuesta(response, status.forbidden, 'No tienes autorizacion',{});
    }
   if (tokenExpirado(request.headers.authorization)){
       return respuesta(response, status.unauthorized, 'Token expirado',{});
   }
    request['empresaID']  = parseInt(obtenerIDEmpresa(request.headers.authorization));
   next();
}

