import {NextResponse} from "next/server"
// import { adminConnection } from "@/utils/adminConnection"
import { dbConnect } from "@/utils/mongoose"
import Producto from "@/models/producto"

export async function POST(request){
    const data = await request.json()
    // console.log(data)
    if(!data.database){
        return NextResponse.json({message:"Datos incompletos"}, {status:400})
    }
    try {
        await dbConnect(data.database)
        let productos = await Producto.find({})
        return NextResponse.json({message: "Productos cargados.", productos:productos},{status:200})
    } catch (error) {
        return NextResponse.json({message:"No se obtubieron productos: "+error},{status:400})
    }
}