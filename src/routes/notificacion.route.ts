import * as express from 'express'
import {enviarNotificaciones, notificarTodosUsuarios, registrarUsuario} from "../middleware/notificaciones.middleware";

export const notificacionRoute = express.Router()
notificacionRoute.post('/', notificarTodosUsuarios)
notificacionRoute.post('/registrar', registrarUsuario)
notificacionRoute.post('/telefono', enviarNotificaciones)

