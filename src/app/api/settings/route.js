import {NextResponse} from "next/server"
import { dbConnect } from "@/utils/conection"
import Setting from "@/models/setting"

export async function POST(request){
    const data = await request.json()
    console.log(data)
    if(!data.database){
        return NextResponse.json({message:"Datos incompletos"}, {status:400})
    }
    try {
        await dbConnect(data.database)
        let settings = await Setting.create(data.data)
        console.log(settings)
        if(!settings) return NextResponse.json({message:"No se guardó la configuración"}, {status:401})      
        return NextResponse.json({message:"Guardado correctamente", settings: settings}, {status:200})
    } catch (error) {
        return NextResponse.json(error.message, {status:400})
    }
}