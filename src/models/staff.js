import mongoose, { Schema, model } from "mongoose";
const ScheduleSchema = new Schema({
    days: {
        type: [String],
        required: true,
        enum: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
    },
    hours: {
        type: String,
        required: true,
        match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9] - ([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    }
});

const StaffSchema = Schema({
    nombre: { type: String, unique: true, uppercase: true },
    foto: { type: String },
    puesto: { type: String, uppercase: true },
    email: { type: String },
    telefono: { type: Number },
    sueldo: { type: Number },
    periodo: { type: String, uppercase: true },
    schedule: {
        type: ScheduleSchema,
    },
    dias: {type: [String]},
    desde: {type: String},
    hasta: {type: String},
    avatar: {type:String}
}, {
    timestamps: true
});

export default mongoose.models.Staff || model("Staff", StaffSchema);