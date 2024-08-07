import {NextResponse} from "next/server"
// import { adminConnection } from "@/utils/adminConnection"
import { dbConnect } from "@/utils/mongoose"
import Plato from "@/models/plato"

export async function POST(request){
    const data = await request.json()
    // console.log(data)
    if(!data.db){
        return NextResponse.json({message:"Datos incompletos"}, {status:400})
    }
    try {
        await dbConnect(data.db)
        let platos = await Plato.find({})
        return NextResponse.json({message: "Platos cargados.", platos:platos},{status:200})
    } catch (error) {
        return NextResponse.json({message:"No se encontraron platos: "+error},{status:400})
    }
}