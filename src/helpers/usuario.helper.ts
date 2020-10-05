import {body} from "express-validator";

export const validarUsuario = [
    body('email', 'El formato del correo es invalido, favor de revisar').isEmail(),
    body('email', 'El correo no puede estar vacio').notEmpty(),
    body('password', 'El password no puede estar vacio').notEmpty(),
    body('telefono', 'El telefono del usuario no puede estar vacio').notEmpty(),
    body('nombre', 'El nombre del usuario no puede estar vacio').notEmpty(),
]
