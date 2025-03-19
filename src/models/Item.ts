import mongoose, { Schema, Document } from "mongoose";

export interface IItem extends Document {
    name: string;
    price: number;
}

const ItemSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
    },
    { timestamps: true }
);

export default mongoose.model<IItem>("Item", ItemSchema);