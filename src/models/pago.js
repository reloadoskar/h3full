import { Schema, model, models } from "mongoose";

var PagoSchema = Schema({
    fecha: String,
    folio: Number,
    cliente: String,
    ubicacion: {type: Schema.ObjectId, ref: 'Ubicacion'},
    credito:{type: Schema.ObjectId, ref: 'Credito'},
    tipo: String,
    importe: Number
},{
    timestamps: true
});

export default models.Pago || model("Pago", PagoSchema);