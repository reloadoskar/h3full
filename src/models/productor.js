import { Schema, model, models } from "mongoose";

var ProductorSchema = Schema({
    nombre: {type: String, unique: true},
    sexo: String,
    clave: {type: String},
    cuentas: [{type: Schema.ObjectId, ref: 'Egreso' }],
    pagos: [{type: Schema.ObjectId, ref: 'Egreso'}],
    rfc: String,
    direccion: String,
    tel1: Number,
    tel2: Number,
    email: {type: String},
    banco1: String,
    cta1: Number,
    banco2: String,
    cta2: Number,
    diasDeCredito: Number,
    comision: Number,
    ref: String
},{
    timestamps: true
});

export default models.Productor || model("Productor", ProductorSchema);