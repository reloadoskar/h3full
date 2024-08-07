import mongoose, { Schema, model } from "mongoose";

var SettingSchema = Schema({
    tipo: {type: String, uppercase:true},
    nombre: {type: String, uppercase: true},
    email:{type:String},
    telefono:{type:Number},
    direccion:{type:String},
    horario:{type:String}, 
    plan:{type:String},
    mesas:{type:Number}
},{
    timestamps: true
});

export default mongoose.models.Setting || model("Setting", SettingSchema);