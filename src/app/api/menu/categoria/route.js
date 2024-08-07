import {NextResponse} from "next/server"
import { dbConnect } from "@/utils/mongoose"
import Categoria from "@/models/categoria"

export async function POST(request){
    const data = await request.json()
    if(!data.database){
        return NextResponse.json({message:"Datos incompletos"}, {status:401})
    }
    try {
        await dbConnect(data.database)
        let nCategoria = await Categoria.create({nombre: data.categoria})
        if(!nCategoria){
            return NextResponse.json({message:"No se guardo la categoria"},{status:401})
        }
        return NextResponse.json({message:"categoria guardada", categoria:nCategoria},{status:200})
    } catch (error) {
        return NextResponse.json({message:"No se guardo la categoria "+error}, {status:400})
    }
}