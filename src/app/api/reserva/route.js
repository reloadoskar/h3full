import {NextResponse} from "next/server"
import { dbConnect } from "@/utils/mongoose"
import Reserva from "@/models/reservacion"

export async function POST(request){
    const data = await request.json()
    if(!data.database){
        return NextResponse.json({message:"Datos incompletos"}, {status:401})
    }
    try {
        await dbConnect(data.database)
        let nReserva = await Reserva.create(data.reserva)
        if(!nReserva){
            return NextResponse.json({message:"No se guardo la reserva"},{status:401})
        }
        return NextResponse.json({message:"reserva guardada", reserva:nReserva},{status:200})
    } catch (error) {
        return NextResponse.json({message:"No se guardo la reserva "+error}, {status:400})
    }
}

export async function PUT(request){
    const data = await request.json()
    // console.log(data)
    if(!data.database){
        return NextResponse.json({message:"Datos incompletos"},{status:401})
    }
    try {
        await dbConnect(data.database)
        let reservaInfo = {
            _id: data._id,
            nombre: data.nombre,
            fecha: data.fecha,
            horario: data.horario,
            personas: data.personas,
            ocacion: data.ocacion,
            comentario: data.comentario,
            status: data.status,
        }
        let reservaUpdated = await Reserva.findOneAndUpdate({_id:data._id}, reservaInfo, {new:true} )
        if(!reservaUpdated){ return NextResponse.json({message:"Error: "},{status:401})}
        return NextResponse.json({message:"Reserva editada correctamente", reserva:reservaUpdated},{status:200})
    } catch (error) {
        return NextResponse.json({message:"No se editó la reserva: "+error},{status:400})
    }
}