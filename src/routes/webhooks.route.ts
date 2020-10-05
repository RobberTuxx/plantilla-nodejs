import * as express from 'express'
import {estatusMensaje, mensajeEntrante} from "../middleware/Webhooks";

export const routerWebhook = express.Router()

routerWebhook.post('/message-status',estatusMensaje)
routerWebhook.post('/inbound-message', mensajeEntrante)
