export interface MensajeText {
    destinatario: string
    remitente: string
    mensaje: string
}

export interface WhatsappImagenFile {
    destinatario: string
    remitente: string
    mensaje: string
    urlImagen: string
    cotenido?: string
}

export interface WhatsappAV {
    destinatario: string
    remitente: string
    mensaje: string
    urlAV: string
}
