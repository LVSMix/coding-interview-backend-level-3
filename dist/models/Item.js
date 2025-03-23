"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const Counter_1 = __importDefault(require("./Counter"));
const ItemSchema = new mongoose_1.Schema({
    id: { type: Number, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
}, { timestamps: true });
// Middleware para asignar un `id` incremental antes de guardar
ItemSchema.pre("save", async function (next) {
    if (!this.isNew)
        return next(); // Solo asigna `id` si el documento es nuevo
    try {
        const counter = await Counter_1.default.findOneAndUpdate({ name: "item" }, // Nombre del contador
        { $inc: { seq: 1 } }, // Incrementa el valor del contador
        { new: true, upsert: true } // Crea el contador si no existe
        );
        this.id = counter.seq; // Asigna el valor del contador al campo `id`
        next();
    }
    catch (error) {
        console.error("Error asignando ID:", error);
        next(error);
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
exports.default = mongoose_1.default.model("Item", ItemSchema);
