import {NextResponse} from "next/server"
import { dbConnect } from "@/utils/mongoose"
import Subcategoria from "@/models/subcategoria"

export async function POST(request){
    const data = await request.json()
    // console.log(data)
    if(!data.database){
        return NextResponse.json({message:"Datos incompletos"}, {status:400})
    }
    try {
        await dbConnect(data.database)
        let subcategorias = await Subcategoria.find({})
        return NextResponse.json({message: "Subcategorias cargadas.", subcategorias:subcategorias},{status:200})
    } catch (error) {
        return NextResponse.json({message:"No se encontraron Subcategorias: "+error},{status:400})
    }
}