import mongoose, { Schema, Document, HydratedDocument, CallbackError } from "mongoose";
import Counter from "./Counter";

export interface IItem extends Document {
    name: string;
    price: number;
}

const ItemSchema: Schema = new Schema(
    {
        id: { type: Number, unique: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
    },
    { timestamps: true }
);

// Middleware para asignar un `id` incremental antes de guardar
ItemSchema.pre("save", async function (next) {
    if (!this.isNew) return next(); // Solo asigna `id` si el documento es nuevo

    try {
        const counter = await Counter.findOneAndUpdate(
            { name: "item" }, // Nombre del contador
            { $inc: { seq: 1 } }, // Incrementa el valor del contador
            { new: true, upsert: true } // Crea el contador si no existe
        );

        this.id = counter!.seq; // Asigna el valor del contador al campo `id`
        next();
    } catch (error) {
        console.error("Error asignando ID:", error);
        next(error as CallbackError);
    }
});
// Configura la transformación para cambiar `_id` a `id` y eliminar `__v`
ItemSchema.set("toJSON", {
    transform: (doc, ret) => {
        delete ret._id; // Elimina `_id`
        delete ret.__v; // Elimina `__v`
        delete ret.createdAt; // Elimina `createdAt`
        delete ret.updatedAt; // Elimina `updatedAt`
        return ret;
    },
});

export default mongoose.model<IItem>("Item", ItemSchema);