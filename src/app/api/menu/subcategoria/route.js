import {NextResponse} from "next/server"
import { dbConnect } from "@/utils/mongoose"
import Subcategoria from "@/models/subcategoria"

export async function POST(request){
    const data = await request.json()
    if(!data.database){
        return NextResponse.json({message:"Datos incompletos"}, {status:401})
    }
    try {
        await dbConnect(data.database)
        let nSubcategoria = await Subcategoria.create({nombre: data.subcategoria})
        if(!nSubcategoria){
            return NextResponse.json({message:"No se guardo la subcategoria"},{status:401})
        }
        return NextResponse.json({message:"Subcategoria guardada", subcategoria:nSubcategoria},{status:200})
    } catch (error) {
        return NextResponse.json({message:"No se guardo la Subcategoria "+error}, {status:400})
    }
}