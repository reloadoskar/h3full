import mongoose, { Schema, model } from "mongoose";

var ClienteSchema = Schema({
    nombre: {type: String, unique: true},
    clave: {type: String, uppercase: true},
    ref: {type: String, uppercase: true},
    sexo: String,
    rfc: {type: String},
    direccion: String,
    tel1: {type:String, },
    tel2: {type:String, },
    email: { type: String, lowercase: true, },
    dias_de_credito: {type: Number, default: 0},
    limite_de_credito: {type: Number, default: 0},
    credito_disponible: {type: Number, default: 0},
    cuentas: [{type: Schema.ObjectId, ref: 'Credito' }],
    pagos: [{type: Schema.ObjectId, ref: 'Ingreso' }],
    ubicacion: {type: Schema.ObjectId, ref: 'Ubicacion'},
},{
    timestamps: true
});

export default mongoose.models.Cliente || model("Cliente", ClienteSchema);