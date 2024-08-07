import {NextResponse} from "next/server"
import { dbConnect } from "@/utils/mongoose"
import CompraItem from "@/models/compraitem"
import Compra from "@/models/compra"
// import Productor from "@/models/productor"

export async function GET(request){
    const data = await request.json()
    if(!data.database){
        return NextResponse.json({message:"Datos incompletos"}, {status:400})
    }
    try {
        await dbConnect(data.database)
        let compraitems = await CompraItem.find({})
        return NextResponse.json(compraitems)
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
        let nItem = data
            nItem.stock= data.cantidad
            nItem.empaquesStock = data.empaques
        let compraitem = await CompraItem.create(nItem)  

        let compra = await Compra.findById(data.compra)
        let itms = compra.items
        itms.push(compraitem._id)
        compra.items = itms
        // let imp = compra.importe || 0
        // let sal = compra.saldo||0
        // compra.importe = compraitem.importe + imp
        // compra.saldo = sal + compraitem.importe
        await compra.save()

        return NextResponse.json(compraitem,{status:200})
    } catch (error) {
        return NextResponse.json({message: "No se guardo la compra "+error},{status:400})
    }
}

export async function PUT(request){
    const data = await request.json()
    if(!data.database){
        return NextResponse.json({message:"Datos incompletos"}, {status:400})
    }
    try {
        await dbConnect(data.database)
        let itemUpdated = await CompraItem.findOneAndUpdate({_id: data._id}, data, { new: true } )
        if(!itemUpdated){
            return NextResponse.json({message:"No se pudo actualizar"}, {status:400})
        }
        return NextResponse.json(itemUpdated)
    } catch (error) {
        return NextResponse.json({message: "No se actualizo "+error},{status:400})
    }
}

export async function DELETE(request){
    const data = await request.json()
    if(!data.database){
        return NextResponse.json({message:"Datos incompletos"}, {status:400})
    }
    try {
        await dbConnect(data.database)
        let itemDeleted = await CompraItem.findByIdAndDelete(data._id)
        return NextResponse.json(itemDeleted)
    } catch (error) {
        return NextResponse.json({message: "No se elimino "+error},{status:400})
    }
}