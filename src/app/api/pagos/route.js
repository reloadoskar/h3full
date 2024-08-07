import {NextResponse} from "next/server"
import { dbConnect } from "@/utils/conection"
import Pago from "@/models/pago"
import Proyecto from "@/models/proyecto"

export async function POST(request){
    const data = await request.json()
    
    if(!data.database){
        return NextResponse.json({message:"Datos incompletos"}, {status:400})
    }
    
    try {
        await dbConnect(data.database)
    
        let newPago = await Pago.create(data.data)
        if(!newPago) return NextResponse.json({message:"No se pudo guardar el pago, intente más tarde"})

        let proyectoToUpdate = await Proyecto.findById(data.data.proyecto)
        if(!proyectoToUpdate) return NextResponse.json({message:"No se encontró el proyecto"}, {status:401})
        proyectoToUpdate.pagos.push(newPago._id)
        let proyectoUpdated = await proyectoToUpdate.save()
        if(!proyectoUpdated) return NextResponse.json({message:"Nose actualizó el proyecto"}, {status:401})
        return NextResponse.json({message:"Guardado correctamente",pago: newPago}, {status:200})
    } catch (error) {
        return NextResponse.json(error.message, {status:400})
    }
}

export async function PUT(request){
    const data = await request.json()
    if (!data.database) {
        return NextResponse.json({ message: "Datos incompletos" }, { status: 400 })
    }
    try {
        await dbConnect(data.database)
        let pago = data.clnt
        let updated = await Pago.findByIdAndUpdate(pago._id, pago, {new: true} ).lean()
        return NextResponse.json(updated)
    } catch (error) {
        return NextResponse.json({ message: "No se actualizo " + error }, { status: 400 })
    }
}