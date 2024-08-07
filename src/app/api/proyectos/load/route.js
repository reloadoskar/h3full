import { NextResponse } from "next/server"
import { dbConnect } from "@/utils/conection"
import Proyecto from "@/models/proyecto"
import Pago from "@/models/pago";
import Gasto from "@/models/gasto"

export async function POST(request){
    const data = await request.json()
    if(!data.database){
        return NextResponse.json({message:"Datos incompletos"}, {status:400})
    }
    try {
        await dbConnect(data.database)        
        let proyectos = await Proyecto.find().populate('pagos').populate('gastos').lean()
        if(!proyectos) return NextResponse.json({message:"No se encontraron proyectos"}, {status:401})
        return NextResponse.json({message:"Se encontraron proyectos",proyectos: proyectos}, {status:200})
    } catch (error) {
        return NextResponse.json(error.message, {status:400})
    }
}