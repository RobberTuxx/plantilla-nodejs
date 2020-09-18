import * as jwt from 'jwt-simple'
import * as moment from "moment";

export enum status {
    success = 200,
    error= 500,
    notfound= 404,
    unauthorized= 401,
    conflict= 409,
    created= 201,
    bad= 400,
    nocontent= 204,
    forbidden= 403,
    unprocesable= 422,
};

export function respuesta(response: any, codigo: number, mensaje: string, data: object) {
    response.status(codigo).send({mensaje: mensaje, data: data});
}

export function generarToken(datos: any ): string {
    return jwt.encode({
        sub: {
            "nombre": datos.nombre,
            "email": datos.email,
            "fechaNacimiento": datos.fechaNacimiento,
        },
        iat: moment().unix(),
        exp: moment().unix() + (60 * 60)
    }, 'estaEsUnaPrueba','HS512');
}

export function tokenExpirado(token: string): boolean {
    let payload = {};
    try {
        payload = jwt.decode(token.split(" ")[1], 'estaEsUnaPrueba');
    } catch (e) {
        return true;
    }
    return payload['exp'] < moment().unix;
}

export function eliminarAcentos(palabra: string) {
    const accents =
        "ÀÁÂÃÄÅàáâãäåßÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž";
    const accentsOut =
        "AAAAAAaaaaaaBOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
    return palabra
        .split("")
        .map((letter, index) => {
            const accentIndex = accents.indexOf(letter);
            return accentIndex !== -1 ? accentsOut[accentIndex] : letter;
        })
        .join("");
}
