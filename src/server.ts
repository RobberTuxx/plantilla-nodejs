import * as dotenv from 'dotenv'
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
import NexmoClass from "./Services/Nexmo";
import {routerWebhook} from "./routes/webhooks.route"
import * as http from "http";
import * as socket from 'socket.io';
import {desconexionUsuario, usuarioSocket} from "./middleware/socket.middleware";

dotenv.config();

const app = express();
const server = http.createServer(app)
export const io = socket(server)
//iniciando la base de datos
const bd = new Inicializacion();
const nexmo = NexmoClass.getInstance()
app.use(cors());
/******************* Middleware's ********************/
app.use(morgan('combined'));
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

io.on('connection', async (socket1) => {
    socket1.on('message', mensaje => {
        socket1.send('llego tu mensaje perro')
    })
    socket1.on('disconnect', usuarioId=> {
        desconexionUsuario(usuarioId)
        socket1.disconnect(true)
    })
    console.log('sockets: ', socket1.id)
    await usuarioSocket(socket1.handshake.query.usuarioId, socket1.id)
    socket1.send('usuario conectado')
});

app.use('/api/v1/login', routerLogin)
app.use('/api/v1/empresa', verificarToken, routerEmpresa)
app.use('/api/v1/telefono', verificarToken, routerTelefonos)
app.use('/api/v1/configuracion', verificarToken, routerConfiguracion)
app.use('/webhooks', routerWebhook)


console.log('conectado')
server.listen(process.env.PORT)
