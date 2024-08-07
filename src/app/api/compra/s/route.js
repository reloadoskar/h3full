import { NextResponse } from 'next/server'
import { dbConnect } from "@/utils/mongoose"
import Compra from '@/models/compra'
import CompraItem from '@/models/compraitem'
import Productor from '@/models/productor'
import VentaItem from '@/models/ventaitem'
import Gasto from '@/models/gasto'
import Pago from '@/models/pago'
import Producto from '@/models/producto'
import Ubicacion from '@/models/ubicacion'

export async function POST(request){
    const data = await request.json()
    if(!data.database){
        return NextResponse.json({message:"Datos incompletos"}, {status:400})
    }
    // console.log(data)
    try {
        await dbConnect(data.database)
        let compras = await Compra.find({fecha: { $gt: data.mesanio + "-00", $lt: data.mesanio + "-32" }})
            .populate('productor items ventaItems gastos pagos')
            .populate({path:'items', populate: 'producto ubicacion'})
            .lean()
        return NextResponse.json({message:"Compras, encontradas",compras:compras},{status:200})
    } catch (error) {
        return NextResponse.json({message: "No se encontraron compras "+error},{status:400})
    }
}