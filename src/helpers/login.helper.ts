import {check} from "express-validator";

export const validarLogIn = [
    check('email', 'El formato del correo electronico no es valido').isEmail(),
    check('email', 'Por favor ingresa tu correo electronico').notEmpty(),
    check('password', 'Por favor ingresa tu contraseña').notEmpty,
]
