import {NextResponse} from "next/server"
import { dbConnect } from "@/utils/mongoose"
import UserSchema from "@/schemas/user"
// import User from '@/models/user'


export async function GET(request, {params}){
    try {
        const conn = await dbConnect()
        // const userFound = await conn.model('User', UserSchema).findById(params.id)
        // if(!userFound){
        //     return NextResponse.json({
        //         message: "No se encontró al usuario."
        //     },{status:404})
        // }
        // return NextResponse.json(userFound)
    } catch (error) {
        return NextResponse.json(error.message,{status:400})
    }
}

export async function DELETE(request, {params}){
    try {
        const userDeleted = await User.findByIdAndDelete(params.id)
        if(!userDeleted)
            return NextResponse.json({message:"No se encontró al usuario."},{status:404})
        return NextResponse.json(userDeleted)
    } catch (error) {
        return NextResponse.json(error.message,{status:400})
    }
}

export async function PUT(request,{params}){
    try {
        const data = await request.json()
        const userUpdated = await User.findByIdAndUpdate(params.id, data,{new: true})
        if(!userUpdated){
            return NextResponse.json({
                message: "No se encontró al usuario."
            },{status:404})
        }
        return NextResponse.json(userUpdated)
    } catch (error) {
        return NextResponse.json(error.message,{status:400})
    }
    
}