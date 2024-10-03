import { NextResponse } from "next/server"
// import { dbConnect } from "@/utils/conection"
import UserSchema from "@/schemas/user";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { createConnection } from "mongoose";
const { MONGODB_URI } = process.env;

export async function POST(request) {
    const req = await request.json()
    // console.log(req)
    try {
        const conn = createConnection(MONGODB_URI + 'H3_USRS')
              conn.on("connected", () => console.log("Db connected :::::::"));
              conn.on("disconnected", () => console.log("Db closed ⚠️."));
                if (!conn) {
                    throw new Error("No se pudo conectar a la base de datos")
                }
        let User = conn.model('User', UserSchema)
        
        
        
        const usuarioExistente = await User.find({ email: req.data.email }).select("+password").lean()
        // console.log(usuarioExistente)
        if (usuarioExistente.length === 0) return NextResponse.json({ message: "Credenciales invalidas", status: "error" }, { status: 200 })
        const isMatch = bcrypt.compareSync(req.data.password, usuarioExistente[0].password);
        if (!isMatch) {
            return NextResponse.json({ message: "Credenciales Invalidas ps", status: "error" }, { status: 200 })
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
            httpOnly: false, secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: '/'
        })

        conn.close()
        return NextResponse.json({ message: "Credenciales validas", payload: payload, status: "success" }, { status: 200 })
    } catch (error) {
        return NextResponse.json(error.message, { status: 500 })
    }
}

export async function DELETE(data){
    cookies().delete('usertoken')
    return NextResponse.json({message:"Cookie eliminada", status:"success"},{status:200})
}