import {NextResponse} from "next/server"
// import { adminConnection } from "@/utils/adminConnection"
import { dbConnect } from "@/utils/conection"
import Ubicacion from "@/models/ubicacion"
// import UbicacionSchema from "@/schemas/ubicacion"

export async function POST(request){
    const data = await request.json()
    // console.log(data)
    if(!data.database){
        return NextResponse.json({message:"Datos incompletos"}, {status:400})
    }
    try {
        await dbConnect(data.database)
        // let Ubicacion = con.model('Ubicacion', UbicacionSchema)
        let ubicacions = await Ubicacion.find({})
        return NextResponse.json({message: "Ubicaciones cargadas.", ubicacions:ubicacions},{status:200})
    } catch (error) {
        return NextResponse.json({message:"No se obtubieron ubicaciones"},{status:400})
    }
}