import { NextResponse } from "next/server"
import { dbConnect } from "@/utils/mongoose"
import CompraItem from "@/models/compraitem"
import Compra from "@/models/compra"
import Movimiento from "@/models/movimiento"
// import Productor from "@/models/productor"

export async function GET(request) {
    const data = await request.json()
    if (!data.database) {
        return NextResponse.json({ message: "Datos incompletos" }, { status: 400 })
    }
    try {
        await dbConnect(data.database)
        let movimientos = await Movimiento.find({})
        return NextResponse.json(movimientos)
    } catch (error) {
        return NextResponse.json({ message: "No se obtubieron movimientos" }, { status: 400 })
    }
}

export async function POST(request) {
    const data = await request.json()
    if (!data.database) {
        return NextResponse.json({ message: "Datos incompletos" }, { status: 400 })
    }
    // console.log(data)
    try {
        await dbConnect(data.database)
        let numeroMovimientos = await Movimiento.countDocuments() || 0
        let nMovimiento = data
            nMovimiento.folio = numeroMovimientos + 1
        let movGuardado = await Movimiento.create(nMovimiento)
        if(!movGuardado){
            return NextResponse.json({message:"No se guardó el movimiento"},{status:400})
        }

        let itmOrigen = await CompraItem.findById(data.item._id)
        
        if(!itmOrigen){
            return NextResponse.json({message:"No se encontró el item"},{status:400})
        }
            itmOrigen.stock -= data.cantidad
            itmOrigen.empaquesStock -= data.empaques

        let itmOrigenUpdated = await itmOrigen.save()
        if (!itmOrigenUpdated){
            return NextResponse.json({message: "No se actualizó el item origen."},{status:400})
        }



        let nitem = {}
            nitem.ubicacion = data.destino
            nitem.compra = data.item.compra
            nitem.producto = data.item.producto
            nitem.clasificacion = data.clasificacion
            nitem.cantidad = data.cantidad
            nitem.stock = data.cantidad
            nitem.empaques = data.empaques
            nitem.empaquesStock = data.empaques
            nitem.costo = 0
            nitem.importe = 0
            nitem.precio = 0
        let nitemsaved = await CompraItem.create(nitem)
        if(!nitemsaved){
            return NextResponse.json({message: "No se guardó el nuevo item."},{status:400})
        }

        let compra = await  Compra.findById(data.item.compra)
        if(!compra){
            return NextResponse.json({message: "No se encontró la compra."},{status:400})
        }
            compra.items.push(nitemsaved._id)
            compra.movimientos.push(movGuardado._id)

        let compraUpdated = await compra.save()
        if(!compraUpdated){
            return NextResponse.json({message: "No se actualizó la compra."},{status:400})
        }

        return NextResponse.json({message:"Guardado correctamente"},{status:200})
    } catch (error) {
        return NextResponse.json({ message: "No se guardo el movimiento: " + error }, { status: 400 })
    }
}

export async function PUT(request) {
    const data = await request.json()
    if (!data.database) {
        return NextResponse.json({ message: "Datos incompletos" }, { status: 400 })
    }
    try {

        // return NextResponse.json(itemUpdated)
    } catch (error) {
        return NextResponse.json({ message: "No se actualizo " + error }, { status: 400 })
    }
}

export async function DELETE(request) {
    const data = await request.json()
    if (!data.database) {
        return NextResponse.json({ message: "Datos incompletos" }, { status: 400 })
    }
    try {

        // return NextResponse.json(itemDeleted)
    } catch (error) {
        return NextResponse.json({ message: "No se eliminó " + error }, { status: 400 })
    }
}