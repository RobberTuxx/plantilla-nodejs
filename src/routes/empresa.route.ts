import * as express from 'express'
import {agregarUsuarioEmpresa, crearEmpresa} from "../middleware/empresa.middleware";
import {validarUsuario} from "../helpers/usuario.helper";

export const routerEmpresa = express.Router();

routerEmpresa.post('/', crearEmpresa)
routerEmpresa.post('/usuario', validarUsuario, agregarUsuarioEmpresa)
