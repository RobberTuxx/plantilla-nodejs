import * as express from 'express';
import * as morgan from 'morgan'
import * as cookieParser from 'cookie-parser';
import "reflect-metadata";
import Inicializacion from './db/Inicializacion'
import {notificacionRoute} from "./routes/notificacion.route";
import {routerLogin} from "./routes/login.route";

const app = express();

//iniciando la base de datos
const bd = new Inicializacion();

/******************* Middleware's ********************/
app.use(morgan('combined'));
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/login', routerLogin)
app.use('/notificacion', notificacionRoute)

app.listen(5000);
