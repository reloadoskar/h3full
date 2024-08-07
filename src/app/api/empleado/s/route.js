import { NextResponse } from "next/server"
import { dbConnect } from "@/utils/mongoose"
// import Empleado from "@/models/empleado"
import User from "@/models/user"

export async function POST(request){
    const data = await request.json()
    if(!data.database){
        return NextResponse.json({message:"Datos incompletos"}, {status:400})
    }
    try {
        await dbConnect(data.database)

        let empleados = await User.find().populate('ubicacion').lean()
        if(!empleados) return NextResponse.json({message:"No se encontraron empleados"}, {status:401})
        return NextResponse.json({message:"Se encontraron empleados",empleados: empleados}, {status:200})
    } catch (error) {
        return NextResponse.json(error.message, {status:400})
    }
}