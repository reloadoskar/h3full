import {NextResponse} from "next/server"
import { dbConnect } from "@/utils/conection"
import Setting from "@/models/setting"

export async function POST(request){
    const data = await request.json()
    if(!data.database){
        // console.log(data.database)
        return NextResponse.json({message:"Datos incompletos"}, {status:400})
    }
    try {
        await dbConnect(data.database)
        let settings = await Setting.find({})   
        if(!settings) return NextResponse.json({message:"No se encontró configuración"}, {status:401})      
        return NextResponse.json({message:"Configuracion encontrada", settings: settings}, {status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json(error.message, {status:400})
    }
}