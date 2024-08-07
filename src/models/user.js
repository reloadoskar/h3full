import { Schema, model, models } from "mongoose";

var UserSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido.'],
        trim: true
    },
    apellido1: {type: String, trim: true},
    apellido2: {type: String, trim: true},
    telefono: {type: String, required: [true, 'El telefono es requerido.'], unique: true, trim: true},
    email: { type: String, required: [true, 'El correo es requerido'], unique: true },
    password: { type: String, select: false },
    database: String,
    level: Number,
    fechaInicio: String,
    tryPeriodEnds: String,
    paidPeriodEnds: String,
    sueldo: {type: Number}
},{
    timestamps: true
});

export default models.User || model("User", UserSchema);