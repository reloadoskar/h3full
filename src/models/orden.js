import mongoose, { Schema, model } from "mongoose";

var OrdenSchema = Schema({
    fecha: {type: String},
    hora:{type:String},
    items:[],   
    total: {type: Number},
    mesa:{type:Number},
    cliente:{ type: Schema.ObjectId, ref: 'Cliente'},
    status: {type: String},
},{
    timestamps: true
});

export default mongoose.models.Orden || model("Orden", OrdenSchema);