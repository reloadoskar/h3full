import { NextResponse } from "next/server"
import { dbConnect } from "@/utils/mongoose"
import CompraItem from "@/models/compraitem"
import Producto from "@/models/producto"
import Compra from "@/models/compra"
import Ubicacion from "@/models/ubicacion"
import Movimiento from "@/models/movimiento"

export async function POST(request) {
    const data = await request.json()
    // console.log(data)
    if (!data.database) {
        return NextResponse.json({ message: "Datos incompletos" }, { status: 400 })
    }
    try {
        await dbConnect(data.database)
        let inventario = await CompraItem.find({ stock: { $gt: 0 } })
            // .populate('producto ubicacion compra')
            .populate({ path: 'producto' })
            .populate({ path: 'ubicacion' })
            .populate({ path: 'compra', select: 'folio fecha clave remision' })
            .lean()
        inventario = await Promise.all(inventario.map(async (itm) => {
            // Asignar el resultado de la búsqueda a itm.movimientos
            let moves = await Movimiento.find({ "item._id": itm._id.toString() })
                .populate("origen destino").lean()
            itm.movimientos = moves
            return itm
        }))
        return NextResponse.json({ message: "Productos encontrados", inventario: inventario }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "No se obtubieron productos " + error }, { status: 400 })
    }
}