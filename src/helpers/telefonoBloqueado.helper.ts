import {body} from "express-validator";

export const validarTelefonos = [
    body('telefonos').custom(value => {
        const array = value.filter(telefono => telefono.length !== 10)
        if (array.length) {
            return Promise.reject('Uno o mas telefonos no son validos')
        }
    })
]
