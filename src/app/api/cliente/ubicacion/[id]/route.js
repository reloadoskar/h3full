import {NextResponse} from "next/server"
// import { adminConnection } from "@/utils/adminConnection"
import { dbConnect } from "@/utils/conection"
// import CompraItem from "@/models/compraitem"
import Cliente from '@/models/cliente'

export async function GET(request,{params}){
    const id = params.id
    // const data = await request.json()
    // // console.log(data)
    // // if(!data.database){
    // //     return NextResponse.json({message:"Datos incompletos"}, {status:400})
    // // }
    try {
        await dbConnect() //falta el database
        let peg = await Cliente.find({clave: "PEG"}).populate('ubicacion')
        let clientes = await Cliente.find({ubicacion: id}).populate('ubicacion').lean()
            clientes.push(peg[0])
        return NextResponse.json({message:"Clientes encontrados", clientes:clientes}, {status:200})
    } catch (error) {
        return NextResponse.json({message:"No se obtubieron clientes "+error},{status:400})
    }
}