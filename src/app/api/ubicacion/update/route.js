import { NextResponse } from "next/server"
import Ubicacion from "@/models/ubicacion"

export async function PUT(request) {
    const data = await request.json()
    if (!data.database) {
        return NextResponse.json({ message: "Datos incompletos" }, { status: 400 })
    }
    try {
        let ub = data.ub
        // console.log(ub)
        let updated = await Ubicacion.findByIdAndUpdate(ub._id, ub, {new: true} ).lean()
        // console.log(updated)
        return NextResponse.json(updated)
    } catch (error) {
        return NextResponse.json({ message: "No se actualizo " + error }, { status: 400 })
    }
}