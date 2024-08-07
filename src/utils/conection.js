import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) throw new Error("MONGO_URL is not defined.");

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null };
}

export const dbConnect = async (dbName = null) => {
    if (cached.conn){
        console.log("Conexión guardada ✅")
        console.log("Conexiones: ["+mongoose.connections.length+"]")
        return cached.conn;
    } 
    console.log("Nueva conexión 🆕")
    if(!dbName){
        console.log("No db!")
        let conx = await mongoose.connect(MONGODB_URI+"H3_USRS")
        return conx
    }else{
        cached.conn = await mongoose.connect(MONGODB_URI + dbName);
    }
    console.log("Conexiones: ["+mongoose.connections.length+"]")

    return cached.conn;
};