const Nexmo = require('nexmo')

class NexmoClass {
    private static instance: NexmoClass;
    public vonage;

    private constructor() {
        this.vonage = new Nexmo({
            apiKey: process.env.API_KEY,
            apiSecret: process.env.API_SECRET,
            applicationId: process.env.APP_ID,
            privateKey: process.env.PRIVATE_KEY_PATH,

        }, {

            apiHost: process.env.NEXMO_HOST,
            debug: true,
        })
    }

    public static getInstance(): NexmoClass {
        if (!NexmoClass.instance) {
            NexmoClass.instance = new NexmoClass()
        }
        return NexmoClass.instance
    }
}

export default NexmoClass
