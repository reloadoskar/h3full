import {Schema, models, model} from 'mongoose'

var EmpleadoSchema = Schema({
    nombre: String, 
    edad: Number, 
    sexo: String, 
    level: {type: Number, default: 5},
    ubicacion: { type: Schema.ObjectId, ref: 'Ubicacion' },
    direccion: String,
    telefono: Number,
    email: String,
    instagram: String,
    facebook: String,
    sueldo: Number
},{
    timestamps: true
});

export default models.Empleado || model("Empleado", EmpleadoSchema);