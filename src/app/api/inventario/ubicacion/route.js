import {NextResponse} from "next/server"
import { dbConnect } from "@/utils/mongoose"
import CompraItem from "@/models/compraitem"
import Producto from "@/models/producto"
import Compra from "@/models/compra"
import Ubicacion from "@/models/ubicacion"

export async function POST(request){
    const data = await request.json()
    // console.log(data)
    if(!data.database){
        return NextResponse.json({message:"Datos incompletos"}, {status:400})
    }
    try {
        await dbConnect(data.database)
        let inventario = await CompraItem.find({ubicacion: data.ubicacion._id}).populate('producto ubicacion compra').lean()
        return NextResponse.json({message:"Productos encontrados", inventario:inventario}, {status:200})
    } catch (error) {
        return NextResponse.json({message:"No se obtubieron productos "+error},{status:400})
    }
}