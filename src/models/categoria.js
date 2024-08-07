import mongoose, { Schema, model } from "mongoose";

var CategoriaSchema = Schema({
    nombre:{type:String, uppercase: true, unique: true},   
});

export default mongoose.models.Categoria || model("Categoria", CategoriaSchema);