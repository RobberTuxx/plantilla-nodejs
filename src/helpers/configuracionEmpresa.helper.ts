import {body} from "express-validator";

export const validarAgregarMensaje = [
    body('mensajes', 'La cantidad de mensajes debe ser de tipo entero').isNumeric(),
    body('mensajes', 'Este campo no puede estar vacio').notEmpty(),
]

