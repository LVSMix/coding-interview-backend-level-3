import Hapi from '@hapi/hapi'
import { defineRoutes } from './routes'
import dotenv from "dotenv";
import connectDB from "./config/db";
import Item from './models/Item';
import Counter from './models/Counter';
import mongoose from 'mongoose';


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
    if (process.env.NODE_ENV === 'test') {
        const itemCollection = mongoose.connection.collection('items');
        const counterCollection = mongoose.connection.collection('counters');
        await itemCollection.deleteMany({});
        await counterCollection.deleteMany({});
        // Initialize the Counter document for "item"
        await counterCollection.insertOne({ name: "item", seq: 0 });
        console.log("🧪 Colecciones limpiadas para pruebas");
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