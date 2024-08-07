import {NextResponse} from "next/server"
import { dbConnect } from "@/utils/mongoose"
import Productor from "@/models/productor"

export async function GET(request){
    const data = await request.json()
    if(!data.database){
        return NextResponse.json({message:"Datos incompletos"}, {status:400})
    }
    try {
        await dbConnect(data.database)
        let productors = await Productor.find({})
        return NextResponse.json({message:"Guardado correctamente",productors: productors}, {status:200})
    } catch (error) {
        return NextResponse.json({message:"No se obtubieron productores"},{status:400})
    }
}

export async function POST(request){
    const data = await request.json()
    // console.log(data)
    
    if(!data.database){
        return NextResponse.json({message:"Datos incompletos"}, {status:400})
    }
    try {
        await dbConnect(data.database)
        let productorExiste = await Productor.findOne({ nombre: data.nombre })
        // console.log(productorExiste)
        if(productorExiste) return NextResponse.json({message:"Productor existente"}, {status:400})
        let newProductor = await Productor.create(data.prdctr)
        if(!newProductor) return NextResponse.json({message:"No se pudo guardar el productor, intente más tarde"})
        return NextResponse.json({message:"Guardado correctamente",productor: newProductor}, {status:200})
    } catch (error) {
        return NextResponse.json(error.message, {status:400})
    }
}