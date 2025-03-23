import mongoose from "mongoose";
import dotenv from "dotenv";
import { MongoMemoryServer } from "mongodb-memory-server";

dotenv.config();


let mongoServer: MongoMemoryServer | null = null;

const connectDB = async () => {
    try {
        if (process.env.NODE_ENV === "test") {
            // Usar MongoDB en memoria para pruebas
            mongoServer = await MongoMemoryServer.create();
            const uri = mongoServer.getUri();
            await mongoose.connect(uri, {});
            console.log("✅ MongoDB en memoria conectado para pruebas");
        } else {
            // Usar la base de datos real para otros entornos
            await mongoose.connect(process.env.MONGO_URI as string, {});
            console.log("✅ MongoDB conectado");
        }
    } catch (error) {
        console.error("❌ Error conectando a MongoDB:", error);
        process.exit(1);
    }
};

export default connectDB;
