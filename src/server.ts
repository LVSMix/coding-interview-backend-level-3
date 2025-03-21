import Hapi from '@hapi/hapi'
import { defineRoutes } from './routes'
import dotenv from "dotenv";
import connectDB from "./config/db";
import Item from './models/Item';
import Counter from './models/Counter';


const getServer = () => {
    const server = Hapi.server({
        host: 'localhost',
        port: process.env.PORT || 3000
    })
    dotenv.config();
    connectDB();
    defineRoutes(server)

    return server
}

export const initializeServer = async () => {
    const server = getServer()
    // Limpia la base de datos si el entorno es de pruebas
    if (process.env.NODE_ENV === 'test') {
        console.log("Limpieza de la base de datos para pruebas...");
        await Item.deleteMany({}); // Limpia la colección de ítems
        await Counter.deleteMany({});
    }

    await server.initialize()
    return server
}

export const startServer = async () => {
    const server = getServer()
    await server.start()
    console.log(`Server running on ${server.info.uri}`)
    return server
};