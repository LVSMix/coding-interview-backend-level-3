import mongoose, { Schema, Document } from "mongoose";

interface ICounter extends Document {
    name: string;
    seq: number;
}

const CounterSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    seq: { type: Number, required: true },
});

const Counter = mongoose.model<ICounter>("Counter", CounterSchema);

export default Counter;