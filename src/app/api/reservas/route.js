import {NextResponse} from "next/server"
import { dbConnect } from "@/utils/mongoose"
import Reservacion from "@/models/reservacion"

export async function POST(request){
    const data = await request.json()
    // console.log(data)
    if(!data.database){
        return NextResponse.json({message:"Datos incompletos"}, {status:400})
    }
    try {
        await dbConnect(data.database)
        let reservas = await Reservacion.find({})
        return NextResponse.json({message: "Reservas cargados.", reservas:reservas},{status:200})
    } catch (error) {
        return NextResponse.json({message:"No se encontraron reservas: "+error},{status:400})
    }
}