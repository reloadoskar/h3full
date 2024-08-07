import { Schema, model, models } from "mongoose";

var CompraSchema = Schema({
    folio: Number,
    clave: { type: String, unique: true},
    productor: { type: Schema.ObjectId, ref: 'Productor' },
    ubicacion: {type: Schema.ObjectId, ref: 'Ubicacion'},
    tipoCompra: {type: Schema.ObjectId, ref: 'TipoCompra'},
    items: [{ type: Schema.ObjectId, ref: 'CompraItem'}],
    itemsOrigen: [],
    gastos: [{ type: Schema.ObjectId, ref: 'Gasto'}],
    pagos: [{ type: Schema.ObjectId, ref: 'Pago'}],
    ventas: [{ type: Schema.ObjectId, ref: 'Venta' }],
    ventaItems: [{ type: Schema.ObjectId, ref: 'VentaItem' }],
    movimientos:[{ type: Schema.ObjectId, ref: 'Movimiento' }],
    liquidacions: [{ type: Schema.ObjectId, ref: 'Liquidacion' }],
    fecha: String,
    remision: String,
    saldo: {type: Number, default:0 },
    status: String,
    importe: {type: Number, default:0},
},{
    timestamps: true
});
// mongoose.models = {}

export default models.Compra || model("Compra", CompraSchema);