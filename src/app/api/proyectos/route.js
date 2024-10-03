import {NextResponse} from "next/server"
import { dbConnect } from "@/utils/conection"
import Proyecto from "@/models/proyecto"

export async function POST(request){
    const data = await request.json()
    
    if(!data.database){
        return NextResponse.json({message:"Datos incompletos"}, {status:400})
    }
    
    try {
        await dbConnect(data.database)
    
        let newProyecto = await Proyecto.create(data.proyecto)
        if(!newProyecto) return NextResponse.json({message:"No se pudo guardar el proyecto, intente más tarde"})
        
        return NextResponse.json({message:"Guardado correctamente",proyecto: newProyecto}, {status:200})
    } catch (error) {
        return NextResponse.json(error.message, {status:400})
    }
}