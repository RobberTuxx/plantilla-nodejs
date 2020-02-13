import {Connection, createConnection} from "typeorm";

class Inicializacion {
    public connection: Connection;
    constructor() {
        this.initializeModels();
    }
    private async initializeModels() {
        const connection = await createConnection();
        if (connection === undefined) { throw new Error('Error connecting to database'); } // In case the connection failed, the app stops.
        //await connection.synchronize(); // this updates the database schema to match the models' definitions
        this.connection = connection; // Store the connection object in the class instance.
    }
}

export default Inicializacion;