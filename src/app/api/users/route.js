import {NextResponse} from "next/server"
import { dbConnect } from "@/utils/mongoose"
import User from '@/models/user'
export async function GET(){
    const data = await request.json()
    if(!data.database){
        return NextResponse.json({message:"Datos incompletos"}, {status:400})
    }
    try {
        await dbConnect(data.database)
        let usuarios = await User.find({})
        return NextResponse.json({message:"Usuarios encontrados",usuarios: usuarios}, {status:200})
    } catch (error) {
        return NextResponse.json({message:"No se obtubieron usuarios"},{status:400})
    }
}

export async function POST(request){
    const data = await request.json()
    if(!data.database){
        return NextResponse.json({message:"Datos incompletos"}, {status:400})
    }
    try {
        await dbConnect(data.database)
        let usuarioExiste = await User.findOne({ email: data.email })
        // console.log(productorExiste)
        if(usuarioExiste) return NextResponse.json({message:"Usuario existente"}, {status:400})
        let newUsuario = await User.create(data)
        if(!newUsuario) return NextResponse.json({message:"No se pudo guardar el usuario, intente más tarde"})
        return NextResponse.json({message:"Guardado correctamente",usuario: newUsuario}, {status:200})
    } catch (error) {
        return NextResponse.json(error.message, {status:400})
    }
}