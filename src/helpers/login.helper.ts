import {check, body} from "express-validator";

export const validarLogIn = [
    body('email', 'Por favor ingresa tu correo electronico').isEmail(),
    body('password', 'Por favor ingresa tu contraseña').notEmpty(),
]
