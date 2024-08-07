import mongoose, { Schema, model } from "mongoose";

var SubcategoriaSchema = Schema({
    nombre:{type:String},
    categoria:{type:String}
});

export default mongoose.models.Subcategoria || model("Subcategoria", SubcategoriaSchema);