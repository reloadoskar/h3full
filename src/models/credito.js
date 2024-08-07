import {Schema, models, model} from 'mongoose'

var CreditoSchema = Schema({
    fecha: String, 
    tipo: String,
    cliente: {type:Schema.ObjectId, ref: 'Cliente'}, 
    ubicacion: { type: Schema.ObjectId, ref: 'Ubicacion' },
    venta: {type: Schema.ObjectId, ref: 'Venta'},
    importe: Number,
    pagado: Number,
    saldo: Number,
    pagos:[]
},{
    timestamps: true
});

export default models.Credito || model("Credito", CreditoSchema);