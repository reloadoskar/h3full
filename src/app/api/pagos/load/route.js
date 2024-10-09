import { NextResponse } from "next/server"
import { dbConnect } from "@/utils/conection"
import Cliente from "@/models/cliente"
import Pago from "@/models/pago";

export async function POST(request){
    const data = await request.json()
    if(!data.database){
        return NextResponse.json({message:"Datos incompletos"}, {status:401})
    }
    try {
        await dbConnect(data.database)        
        let pagos = await Pago.find().lean()
        if(!pagos) return NextResponse.json({message:"No se encontraron pagos"}, {status:401})
        return NextResponse.json({message:"Se encontraron pagos",pagos: pagos}, {status:200})
    } catch (error) {
        return NextResponse.json(error.message, {status:402})
    }
}