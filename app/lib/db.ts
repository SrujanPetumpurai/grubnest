import * as dotenv from 'dotenv'
import mongoose from 'mongoose';
dotenv.config();
const MONGO_URI: string = process.env.MONGO_URI!;
if (!MONGO_URI) {
    throw new Error("Please add your Mongo URI to .env");
}

let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDB() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGO_URI, {
            bufferCommands: false,
        }).then(mongoose => mongoose);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
