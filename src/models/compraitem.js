import {Schema, model, models} from 'mongoose'

var CompraItemSchema = Schema({
    compra: { type: Schema.ObjectId, ref: 'Compra'},
    ubicacion: { type: Schema.ObjectId, ref: 'Ubicacion' },
    producto: { type: Schema.ObjectId, ref: 'Producto' },
    provedor: { type: Schema.ObjectId, ref: 'Provedor' },
    clasificacion: String,
    cantidad: Number,
    empaques: Number,
    empaquesStock: Number,
    stock: Number,
    precio: Number,
    importe: Number
},{
    timestamps: true
})

export default models.CompraItem || model("CompraItem", CompraItemSchema);