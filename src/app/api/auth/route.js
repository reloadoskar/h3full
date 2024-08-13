import { NextResponse } from "next/server"
import { dbConnect } from "@/utils/conection"
import User from "@/models/user"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export async function POST(request, res) {
    const data = await request.json() 
    console.log(data)
    try {
        await dbConnect("H3_USRS")
        const usuarioExistente = await User.find({ email: data.email }).select("+password").lean()
        console.log(usuarioExistente)
        if (!usuarioExistente) return NextResponse.json({ message: "Credenciales invalidas" }, { status: 401 })
        const isMatch = await bcrypt.compareSync(data.password, usuarioExistente[0].password);
        if (!isMatch) {
            return NextResponse.json({ message: "Credenciales Invalidas ps" }, { status: 401 })
        }

        const payload = {
            _id: usuarioExistente[0]._id,
            nombre: usuarioExistente[0].nombre,
            apellido: usuarioExistente[0].apellido,
            email: usuarioExistente[0].email,
            ubicacion: usuarioExistente[0].ubicacion,
            level: usuarioExistente[0].level,
            database: usuarioExistente[0].database,
            tryPeriodEnds: usuarioExistente[0].tryPeriodEnds,
            paidPeriodEnds: usuarioExistente[0].paidPeriodEnds,
        } // console.log(payload)

        let token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '48h' })
        
        cookies().set("usertoken", token, {
            httpOnly: false, secure: process.env.NEDE_ENV === "production",
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: '/'})
        return NextResponse.json({ message: "Credenciales validas", payload: payload, status: "success" }, { status: 200 })
        } catch (error) {
            return NextResponse.json(error.message, { status: 402 })
        }
    }