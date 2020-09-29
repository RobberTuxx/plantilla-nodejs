import * as express from 'express';
import * as morgan from 'morgan'
import * as cookieParser from 'cookie-parser';
import "reflect-metadata";
import Inicializacion from './db/Inicializacion'
import * as cors from "cors";
import {routerLogin} from "./routes/login.route";
import {routerEmpresa} from "./routes/empresa.route";
import {verificarToken} from "./middleware/verificarAutenticación";
import {routerTelefonos} from "./routes/telefonoBloqueado.route";
import {routerConfiguracion} from "./routes/configuracionEmpresa.route";

const app = express();

//iniciando la base de datos
const bd = new Inicializacion();
app.use(cors());
/******************* Middleware's ********************/
app.use(morgan('combined'));
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api/v1/login', routerLogin)
app.use('/api/v1/empresa', verificarToken, routerEmpresa)
app.use('/api/v1/telefono', verificarToken, routerTelefonos)
app.use('/api/v1/configuracion', verificarToken, routerConfiguracion)


console.log('conectado')
app.listen(3000);
