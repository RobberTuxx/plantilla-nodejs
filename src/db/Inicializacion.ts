import {Connection, createConnection} from "typeorm";
import {Rol} from "../entity/Rol";
import {Usuario} from "../entity/Usuario";
import * as bcrypt from 'bcrypt';

class Inicializacion {
    public connection: Connection;

    constructor() {
        this.init()
    }

    private async init() {
        await this.initializeModels();
        await this.datosIniciales();
    }

    private async initializeModels() {
        const connection = await createConnection();
        if (connection === undefined) {
            throw new Error('Error connecting to database');
        } // In case the connection failed, the app stops.
        //await connection.synchronize(); // this updates the database schema to match the models' definitions
        this.connection = connection; // Store the connection object in the class instance.
        console.log('conexion lista')
    }

    private async datosIniciales() {
        /*################ ROLES #####################*/
        if ((await Rol.count()) === 0) {
            await Rol.create({
                nombre: "ADMINISTRADOR"
            }).save()
            const rolSuper = await Rol.create({
                nombre: "SUPER"
            }).save()
            await Rol.create({
                nombre: "COLABORADOR"
            }).save()
            /*################ USUARIO #####################*/
            await Usuario.create({
                nombre: "Karim",
                apellidoPaterno: "Ricardez",
                apellidoMaterno: "Ortiz",
                password: await bcrypt.hash("temporal", 10),
                email: "karimnot@gmail.com",
                pushToken: "",
                telefono: "",
                rol: [rolSuper],
            }).save()
        }
    }
}

export default Inicializacion;
