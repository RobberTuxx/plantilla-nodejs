
export interface WebhookInterface {
    message_uuid: string
    "from": {
        type: string
        "number": string
    }
    to: {
        type: string
        "number": string
    }
    message: {
        content: {
            type: string,
            text: string
        }
    },
    timestamp: Date
}
