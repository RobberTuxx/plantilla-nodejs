import * as express from 'express'
import {validarLogIn} from "../helpers/login.helper";
import {logIn} from "../middleware/login.middleware";

export const routerLogin = express.Router();

routerLogin.post('/', validarLogIn, logIn)
