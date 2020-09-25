import * as express from 'express'
import {crearEmpresa} from "../middleware/empresa.middleware";

export const routerEmpresa = express.Router();

routerEmpresa.post('/', crearEmpresa)
