import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
// import { adminConnection } from "@/utils/adminConnection";
import { createConnection } from "mongoose";
import UserSchema from "@/schemas/user";
import UbicacionSchema from "@/schemas/ubicacion";
import ClienteSchema from "@/schemas/cliente";
import ProductoSchema from "@/schemas/producto";
import ProductorSchema from "@/schemas/productor";
// import User from '@/models/user'

const curDate = new Date()
let curDateISO = curDate.toISOString()
let tryPeriod = curDate.setDate(curDate.getDate() + 30)
tryPeriod = new Date(tryPeriod).toISOString()

export async function POST(request) {
    try {
        // const conn = await adminConnection()
        const conn = createConnection(`mongodb://0.0.0.0:27017/H3_USRS`)
              conn.on("connected", () => console.log("Db connected :::::::"));
              conn.on("disconnected", () => console.log("Db closed ⚠️."));
              if(!conn){
                  throw new Error("No se pudo conectar a la base de datos")
              }
        let User = conn.model('User', UserSchema)
        const data = await request.json()
        // console.log(data)
        // const userExist = await conn.model('User',UserSchema).findOne({ email: data.email })
        const userExist = await User.findOne({ email: data.email })
        if (userExist) {
            return NextResponse.json({ message: "El correo ya ha sido registrado."}, { status: 401 })
        }
        const hashedPassword = await bcrypt.hash(data.password, 12)

        let email_analizado = /^([^]+)@(\w+).(\w+)$/.exec(data.email)
        let [,nombrem, servidor, dominio] = email_analizado
        let dbname = nombrem+"_"+servidor

        const newUser = {
            nombre: data.nombre || "unamed",
            email: data.email,
            telefono: data.telefono,
            database: dbname, //mejorar el nombre de la base de datos con el nombre solo se va a repetir pronto
            level: 1,
            fechaInicio: curDateISO,
            tryPeriodEnds: tryPeriod,
            paidPeriodEnds: tryPeriod,
            password: hashedPassword
        }
        const userSaved = await User.create(newUser)
        conn.close()
        if(!userSaved){
            return NextResponse.json({message:"No se guardo el usuario"},{status:401})
        }

        let conn2 = createConnection(`mongodb://0.0.0.0:27017/${dbname}`)
        let Usr = conn2.model('User', UserSchema)
        let Ubi = conn2.model('Ubicacion', UbicacionSchema)
        let Cli = conn2.model('Cliente', ClienteSchema)
        let Pro = conn2.model('Producto', ProductoSchema)
        let Prdctr = conn2.model('Productor', ProductorSchema)


        await Usr.create(newUser)
        await Ubi.create({nombre:"SUCURSAL1", tipo:"SUCURSAL"})
        await Cli.create({nombre:"PUBLICO EN GENERAL", clave:"PEG"})
        await Pro.create({descripcion:"PRODUCTO PRUEBA", clave:"PP", costo:15, precio1:35})
        await Prdctr.create({nombre:"COMPRA GENERAL", clave:"CG"})


        conn2.close()
        return NextResponse.json(userSaved)
    } catch (error) {
        return NextResponse.json({message:error?.message},{status:400})
    }
}