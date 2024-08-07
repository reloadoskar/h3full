import mongoose, { Schema, model } from "mongoose";

var ReservacionSchema = Schema({
    nombre: {type: String, unique: true},
    email:{type:String},
    telefono:{type:Number},
    fecha:{type:String},
    horario:{type:String},
    personas:{type:Number},
    ocacion:{type:String},
    comentario:{type:String},
    status:{type:String, default: "PENDIENTE", }
},{
    timestamps: true
});

export default mongoose.models.Reservacion || model("Reservacion", ReservacionSchema);