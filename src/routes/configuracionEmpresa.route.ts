import * as express from 'express'
import {agregarMensajes} from "../middleware/configuracionEmpresa.middleware";
import {validarAgregarMensaje} from "../helpers/configuracionEmpresa.helper";

export const routerConfiguracion = express.Router()

routerConfiguracion.post('/', validarAgregarMensaje, agregarMensajes)
