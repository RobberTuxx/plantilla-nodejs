import * as express from 'express'
import {agregarTelefono} from "../middleware/telefonoBloqueado.middleware";
import {validarTelefonos} from "../helpers/telefonoBloqueado.helper";

export const routerTelefonos = express.Router()

routerTelefonos.post('/', validarTelefonos, agregarTelefono)
