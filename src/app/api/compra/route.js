import {NextResponse} from "next/server"
// import { adminConnection } from "@/utils/adminConnection"
import { dbConnect } from "@/utils/mongoose"
import Compra from "@/models/compra"
import Productor from "@/models/productor"

export async function GET(request){
    const data = await request.json()
    if(!data.database){
        return NextResponse.json({message:"Datos incompletos"}, {status:400})
    }
    try {
        await dbConnect(data.database)
        let compras = await Compra.find({})
        return NextResponse.json(compras)
    } catch (error) {
        return NextResponse.json({message:"No se obtubieron compras"},{status:400})
    }
}

export async function POST(request){
    const data = await request.json()
    if(!data.database){
        return NextResponse.json({message:"Datos incompletos"}, {status:400})
    }
    // console.log(data)
    try {
        await dbConnect(data.database)
        let numerocompras = await Compra.estimatedDocumentCount()
        let nuevacompra = {
            folio: numerocompras + 1,
            productor: data.productor,
            tipoCompra: data.tipoCompra,
            remision: data.remision,
            importe: data.importe,
            saldo: data.importe,
            fecha: data.fecha,
            status: 'ACTIVO',
            items: []
        }
        let productor = await Productor.findById(data.productor)
        let numerocomprasproductor = await Compra.countDocuments({ productor: data.productor })
        let sigientenumerocompraproductor = numerocomprasproductor + 1
        nuevacompra.clave = productor.clave + "-" + sigientenumerocompraproductor


        let compraGuardada = await Compra.create(nuevacompra)
        return NextResponse.json(compraGuardada)
    } catch (error) {
        return NextResponse.json({message: "No se guardo la compra "+error},{status:400})
    }
}