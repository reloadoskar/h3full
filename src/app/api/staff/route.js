import { NextResponse } from "next/server"
import { dbConnect } from "@/utils/conection"
import Staff from "@/models/staff"
import { writeFile } from "fs/promises";
import path from 'path';

export const guardaImagenYCreaObjetoStaff = async data => {
    const dias = JSON.parse(data.get("dias"))
    const file = data.get('file') // console.log(file)
        let pathfile = "/images/avatarH5.png" // Imagen por default
        
        if (file!== "undefined") {         
            const bytes = await file.arrayBuffer()
            const buffer = Buffer.from(bytes)
            const filepath = path.join(process.cwd(), "public/images", file.name)
            writeFile(filepath, buffer)
            console.log("Imagen guardada en: ", filepath)
            pathfile = "/images/"+file.name
        }

        const staffInfo = {
            _id: data.get('_id') || "",
            nombre: data.get('nombre'),
            puesto: data.get('puesto'),
            email: data.get('email'),
            telefono: data.get('telefono'),
            sueldo: data.get('sueldo'),
            periodo: data.get('periodo'),
            dias: dias,
            desde: data.get('desde'),
            hasta: data.get('hasta'),
            avatar: pathfile,
        }

        return staffInfo
}

export async function POST(request) {
    // const data = await request.json()
    const data = await request.formData();
    // console.log(data)
    const database = data.get('database')
    // const dias = JSON.parse(data.get("dias"))
    // console.log(dias)
    if (!database) {
        return NextResponse.json({ message: "Datos incompletos" }, { status: 401 })
    }
    try {
        const staffInfo = await guardaImagenYCreaObjetoStaff(data)
        
        await dbConnect(database)

        let nStaff = await Staff.create(staffInfo)
        if (!nStaff) {
            return NextResponse.json({ message: "No se guardo la staff", status:401 }, { status: 401 })
        }
        return NextResponse.json({ message: "staff guardada", staff: nStaff, status:200 }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "No se guardo la staff " + error,status:401 }, { status: 401 })
    }
}

export async function PUT(request) {
    // const data = await request.json() // console.log(data)
    const data = await request.formData();
    const database = data.get('database')

    if (!database) {
        return NextResponse.json({ message: "Datos incompletos" }, { status: 401 })
    }

    try {
        const staffInfo = await guardaImagenYCreaObjetoStaff(data)
        
        await dbConnect(database)
        let staffUpdated = await Staff.findOneAndUpdate({ _id: staffInfo._id }, staffInfo, { new: true })
        if (!staffUpdated) { return NextResponse.json({ message: "Error: ",status:401 }, { status: 401 }) }
        return NextResponse.json({ message: "Staff editado correctamente", staffUpdated, status:200 }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "No se editó el staff: " + error, status:401 }, { status: 400 })
    }
}

export async function DELETE(request) {
    const data = await request.json() // console.log(data)
    if (!data.database) {
        return NextResponse.json({ message: "Datos incompletos" }, { status: 200 })
    }
    await dbConnect(data.database)
    let staffDeleted = await Staff.findByIdAndDelete(data.stf._id)
    return NextResponse.json({ message: "Miembro eliminado correctamente", staffDeleted }, { status: 200 })
}