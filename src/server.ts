import * as express from 'express';
import * as morgan from 'morgan'
import * as cookieParser from 'cookie-parser';
import "reflect-metadata";
import Inicializacion from './db/Inicializacion'

const app = express();

//iniciando la base de datos
const bd = new Inicializacion();

/******************* Middleware's ********************/
app.use(morgan('combined'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(5000);