import {Schema, model, models } from 'mongoose'

var UbicacionSchema = Schema({
    nombre: {type: String, unique: true},
    tipo: {type: String},
    direccion: {type: String},
    telefono: {type: String},
    email:String,
    image: String,
    capacidad: Number,
    empaqueCapacidad: String,
    empleados:[{type: Schema.ObjectId, ref: 'Empleado'}],
    horai:String,
    horaf:String,
    servicios: [],
    
},{
    timestamps: true
});

 export default models.Ubicacion || model("Ubicacion", UbicacionSchema);