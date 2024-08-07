import mongoose, { Schema, model } from "mongoose";

var PlatoSchema = Schema({
    nombre: {type: String, unique: true},
    categoria: {type: String, uppercase: true},
    subcategoria: {type: String, uppercase: true},
    descripcion: {type: String},
    imagenes:[ {type:String} ],
    filepath: {type:String},
    precio: {type: Number}
},{
    timestamps: true
});

export default mongoose.models.Plato || model("Plato", PlatoSchema);