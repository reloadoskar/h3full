import {NextResponse} from "next/server"
import { dbConnect } from "@/utils/conection"
// import ClienteSchema from "@/schemas/cliente"
import Cliente from "@/models/cliente"

export async function GET(request){
    const data = await request.json()
    if(!data.database){
        return NextResponse.json({message:"Datos incompletos"}, {status:400})
    }
    try {
        await dbConnect(data.database)
        // let Cliente = con.model('Cliente', ClienteSchema)
        let clientes = await Cliente.find({})
        return NextResponse.json({message:"Clientes encontrados",clientes: clientes}, {status:200})
    } catch (error) {
        return NextResponse.json({message:"No se obtubieron clientes"},{status:400})
    }
}

export async function POST(request){
    const data = await request.json()
    // console.log(data)
    if(!data.database){
        return NextResponse.json({message:"Datos incompletos"}, {status:400})
    }
    try {
        await dbConnect(data.database)
        // let Cliente = con.model('Cliente', ClienteSchema)
        let clienteExiste = await Cliente.findOne({ nombre: data.data.nombre })
        // console.log(productorExiste)
        if(clienteExiste) return NextResponse.json({message:"Cliente existente"}, {status:400})
        let newCliente = await Cliente.create(data.data)
        if(!newCliente) return NextResponse.json({message:"No se pudo guardar el cliente, intente más tarde"})

        await newCliente.populate('ubicacion')
        return NextResponse.json({message:"Guardado correctamente",cliente: newCliente}, {status:200})
    } catch (error) {
        return NextResponse.json(error.message, {status:400})
    }
}

export async function PUT(request){
    const data = await request.json()
    if (!data.database) {
        return NextResponse.json({ message: "Datos incompletos" }, { status: 400 })
    }
    try {
        await dbConnect(data.database)
        let cliente = data.clnt
        // console.log(cliente)
        let updated = await Cliente.findByIdAndUpdate(cliente._id, cliente, {new: true} ).lean()
        // console.log(updated)
        return NextResponse.json(updated)
    } catch (error) {
        return NextResponse.json({ message: "No se actualizo " + error }, { status: 400 })
    }
}