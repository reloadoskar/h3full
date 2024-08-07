import {NextResponse} from "next/server"
// import { adminConnection } from "@/utils/adminConnection"
import { dbConnect } from "@/utils/mongoose"
import Producto from "@/models/producto"

export async function GET(request){
    const data = await request.json()
    if(!data.database){
        return NextResponse.json({message:"Datos incompletos"}, {status:400})
    }
    try {
        await dbConnect(data.database)
        let productos = await Producto.find({})
        return NextResponse.json({message:"Productos encontrados",productos: productos}, {status:200})
    } catch (error) {
        return NextResponse.json({message:"No se obtubieron productos"},{status:400})
    }
}

export async function POST(request){
    const data = await request.json()
    if(!data.database){
        return NextResponse.json({message:"Datos incompletos"}, {status:400})
    }
    try {
        await dbConnect(data.database)
        let productoExiste = await Producto.findOne({ descripcion: data.descripcion })
        // console.log(productorExiste)
        if(productoExiste) return NextResponse.json({message:"Producto existente"}, {status:400})
        let newProducto = await Producto.create(data)
        if(!newProducto) return NextResponse.json({message:"No se pudo guardar el producto, intente más tarde"})
        return NextResponse.json({message:"Guardado correctamente",productor: newProducto}, {status:200})
    } catch (error) {
        return NextResponse.json(error.message, {status:400})
    }
}