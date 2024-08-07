import { NextResponse } from "next/server"
import { dbConnect } from "@/utils/mongoose"
import Productor from "@/models/productor"

export async function POST(request){
    const data = await request.json()
    if(!data.database){
        return NextResponse.json({message:"Datos incompletos"}, {status:400})
    }
    try {
        await dbConnect(data.database)

        let productors = await Productor.find().lean()
        if(!productors) return NextResponse.json({message:"No se encontraron productors"}, {status:401})
        return NextResponse.json({message:"Se encontraron productors",productors: productors}, {status:200})
    } catch (error) {
        return NextResponse.json(error.message, {status:400})
    }
}