import {NextResponse} from "next/server"
import { dbConnect } from "@/utils/conection"
import Staff from "@/models/staff"

export async function POST(request){
    const data = await request.json()
    // console.log(data)
    if(!data.database){
        return NextResponse.json({message:"Datos incompletos"}, {status:400})
    }
    try {
        await dbConnect(data.database)
        let staffs = await Staff.find({})
        return NextResponse.json({message: "Staffs cargados.", staffs:staffs},{status:200})
    } catch (error) {
        return NextResponse.json({message:"No se encontraron staffs: "+error},{status:400})
    }
}