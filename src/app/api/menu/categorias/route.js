import {NextResponse} from "next/server"
import { dbConnect } from "@/utils/mongoose"
import Categoria from "@/models/categoria"

export async function POST(request){
    const data = await request.json()
    // console.log(data)
    if(!data.database){
        return NextResponse.json({message:"Datos incompletos"}, {status:400})
    }
    try {
        await dbConnect(data.database)
        let categorias = await Categoria.find({})
        return NextResponse.json({message: "Categorias cargadas.", categorias:categorias},{status:200})
    } catch (error) {
        return NextResponse.json({message:"No se encontraron categorias: "+error},{status:400})
    }
}