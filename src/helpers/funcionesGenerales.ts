import * as jwt from 'jwt-simple'
import * as moment from "moment";

export const status = {
    success: 200,
    error: 500,
    notfound: 404,
    unauthorized: 401,
    conflict: 409,
    created: 201,
    bad: 400,
    nocontent: 204,
    forbidden: 403,
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
    const payload = jwt.decode(token.split(" ")[1], 'estaEsUnaPrueba',true);
    return payload.exp < moment().unix;
}