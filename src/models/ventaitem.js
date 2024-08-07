import {Schema, model, models} from "mongoose";
var VentaItemSchema = Schema({
    venta: {type: Schema.ObjectId, ref: 'Venta'},
    ventaFolio: { type: Number, default: 0},
    ubicacion: {type: Schema.ObjectId, ref: 'Ubicacion'},
    fecha: String,
    compra: {type: Schema.ObjectId, ref: 'Compra'},
    compraItem: {type: Schema.ObjectId, ref: 'CompraItem'},
    producto: { type: Schema.ObjectId, ref: 'Producto' },
    cantidad: { type: Number, default: 0},
    empaques: { type: Number, default: 0},
    precio: { type: Number, default: 0},
    importe: { type: Number, default: 0},
    pesadas: [],
    tara: { type: Number, default: 0},
    ttara: { type: Number, default: 0},
    bruto: { type: Number, default: 0},
    neto: { type: Number, default: 0}
},{
    timestamps: true
});
export default models.VentaItem || model("VentaItem", VentaItemSchema);