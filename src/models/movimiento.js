import { Schema, model, models } from "mongoose";

var MovimientoSchema = Schema({
    fecha: String,
    folio: Number,
    origen: String,
    destino: String,
    item: {},
    clasificacion: String,
    cantidad: Number,
    empaques: Number,
    comentario: String,
    pesadas: [],
    tara: Number,
    ttara: Number,
    bruto: Number,
    neto: Number,
    status: String
},{
    timestamps: true
});

export default models.Movimiento || model("Movimiento", MovimientoSchema);