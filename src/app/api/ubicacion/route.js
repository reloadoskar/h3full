import {NextResponse} from "next/server"
// import { adminConnection } from "@/utils/adminConnection"
import { dbConnect } from "@/utils/mongoose"
import Ubicacion from "@/models/ubicacion"

export async function GET(request){
   // TENGO PROBLEMAS CON ESTA RUTA POR QUE ES DIFICIL PASARLE DATOS. POR AHORA NO SE USARÁ
}

export async function POST(request){
    const data = await request.json()
    // console.log(data)
    
    if(!data.database){
        return NextResponse.json({message:"Datos incompletos"}, {status:400})
    }
    try {
        await dbConnect(data.database)
        let ubicacionExiste = await Ubicacion.findOne({ nombre: data.nombre })
        // console.log(productorExiste)
        if(ubicacionExiste) return NextResponse.json({message:"Ubicación existente"}, {status:400})
        let newUbicacion = await Ubicacion.create(data)
        if(!newUbicacion) return NextResponse.json({message:"No se pudo guardar la ubicación, intente más tarde"})
        return NextResponse.json({message:"Guardado correctamente",ubicacion: newUbicacion}, {status:200})
    } catch (error) {
        return NextResponse.json(error.message, {status:400})
    }
}