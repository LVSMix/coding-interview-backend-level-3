"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = exports.initializeServer = void 0;
const hapi_1 = __importDefault(require("@hapi/hapi"));
const routes_1 = require("./routes");
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const mongoose_1 = __importDefault(require("mongoose"));
const getServer = () => {
    const server = hapi_1.default.server({
        host: 'localhost',
        port: process.env.PORT || 3000
    });
    dotenv_1.default.config();
    (0, db_1.default)();
    (0, routes_1.defineRoutes)(server);
    return server;
};
const initializeServer = async () => {
    const server = getServer();
    if (process.env.NODE_ENV === 'test') {
        const itemCollection = mongoose_1.default.connection.collection('items');
        const counterCollection = mongoose_1.default.connection.collection('counters');
        await itemCollection.deleteMany({});
        await counterCollection.deleteMany({});
        // Initialize the Counter document for "item"
        await counterCollection.insertOne({ name: "item", seq: 0 });
        console.log("🧪 Colecciones limpiadas para pruebas");
    }
    await server.initialize();
    return server;
};
exports.initializeServer = initializeServer;
const startServer = async () => {
    const server = getServer();
    await server.start();
    console.log(`Server running on ${server.info.uri}`);
    return server;
};
exports.startServer = startServer;
