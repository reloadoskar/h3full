import { NextResponse } from "next/server"
import { dbConnect } from "@/utils/mongoose"
import Venta from "@/models/venta"
import VentaItem from '@/models/ventaitem'
import Cliente from '@/models/cliente'
import Credito from '@/models/credito'
import Pago from '@/models/pago'
import Compra from '@/models/compra'
import CompraItem from '@/models/compraitem'
// falta el ingreso hay que ver si lo metemos o ya no
export async function POST(request) {
    const data = await request.json()
    // console.log(data)
    if (!data.database) {
        return NextResponse.json({ message: "Datos incompletos" }, { status: 400 })
    }
    try {
        await dbConnect(data.database)


        let cliente = await Cliente.find({clave:"PG"})
        if (!cliente) {
            throw new Error("No se encontro al cliente")
        }
        let venta = new Venta()

        if (data.tipoPago === "CRÉDITO") {
            let credito = new Credito()
            credito.fecha = data.fecha
            credito.tipo = "VENTA"
            credito.cliente = data.cliente
            credito.ubicacion = data.ubicacion
            credito.venta = venta._id
            credito.importe = data.importe
            credito.pagado = data.acuenta
            credito.saldo = data.importe - data.acuenta

            if (data.acuenta > 0) {
                let pago = new Pago()
                pago.fecha = data.fecha
                pago.cliente = data.cliente
                pago.ubicacion = data.ubicacion
                pago.credito = credito._id
                pago.importe = data.acuenta
                credito.pagos.push(pago._id)
            }

            let creditoDisponible = cliente.credito_disponible || 0
            let creditoActualizado = creditoDisponible - credito.saldo
            cliente.credito_disponible = creditoActualizado
            // console.log("Actualizando informacion del cliente...")
            let clienteUpdated = await cliente.save()
            if (!clienteUpdated) {
                throw new Error("No se actualizo el cliente.")
            }
        } else {
            venta.acuenta = data.acuenta
            // ingreso.importe = data.total
        }

        console.log("...Creando venta...")
        let numVentas = await Venta.estimatedDocumentCount()
        if (!numVentas) {
            numVentas = 0
            // throw new Error("No se obtuvo el nuevo folio")
        }
        venta.folio = numVentas + 1
        venta.ubicacion = data.ubicacion
        venta.cliente = data.cliente
        venta.fecha = data.fecha
        venta.importe = data.importe
        venta.tipoPago = data.tipoPago


        console.log("...Creando items...")
        let items = []
        data.items.forEach(el => {
            // console.log(el)
            var ventaItem = new VentaItem()
            ventaItem.venta = venta._id
            ventaItem.ventaFolio = venta.folio
            ventaItem.ubicacion = venta.ubicacion
            ventaItem.fecha = venta.fecha
            ventaItem.compra = el.item.compra
            ventaItem.compraItem = el.item
            ventaItem.producto = el.item.producto._id
            ventaItem.cantidad = el.cantidad
            ventaItem.empaques = el.empaques
            ventaItem.precio = el.precio
            ventaItem.importe = el.importe
            // ventaItem.pesadas = el.pesadas
            // ventaItem.tara = el.tara
            // ventaItem.ttara = el.ttara
            // ventaItem.bruto = el.bruto
            // ventaItem.neto = el.neto

            venta.items.push(ventaItem._id)
            items.push(ventaItem)

            CompraItem.updateOne(
                { _id: el.item._id },
                { "$inc": { "stock": -el.cantidad, "empaquesStock": -el.empaques } }
            ).catch(err => {
                console.log(err.message, 'error')
            })

            Compra.updateOne(
                { _id: el.item.compra._id },
                { "$push": { ventaItems: ventaItem._id } }
            ).catch(err => {
                console.log(err.message, 'error')
            })

        })
        console.log("...Guardando ventaItems...")
        let ventaItemsSaved = await VentaItem.insertMany(items)
        if (!ventaItemsSaved) {
            throw new Error("No se guardaron los items de venta")
        }

        console.log("...Guardando venta...")
        let ventaSvd = await venta.save()
        if (!ventaSvd) {
            throw new Error("No se guardo la pnchx venta!! 😡😡")
        }

        return NextResponse.json("ok", { status: 200 })

    } catch (error) {
        return NextResponse.json(error.message, { status: 401 })
    }
}