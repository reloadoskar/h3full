import mongoose, { Schema, model } from "mongoose";

var ProyectoSchema = Schema({
    fecha: String,
    cliente: String,   
    nombre: String,
    descripcion: String,    
    presupuesto: {type: Number, default: 0},
    limite_superior: {type: Number, default: 0},
    limite_inferior: {type: Number, default: 0},
    pagos: [{type: Schema.ObjectId, ref: 'Pago' }],
    gastos: [{type: Schema.ObjectId, ref: 'Gasto'}],
    saldo: Number
},{
    timestamps: true
});

export default mongoose.models.Proyecto || model("Proyecto", ProyectoSchema);