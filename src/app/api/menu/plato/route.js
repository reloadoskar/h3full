import { NextResponse } from "next/server"
import { dbConnect } from "@/utils/conection"
import Plato from "@/models/plato"
import path from 'path';
import { writeFile } from "fs/promises";

export async function POST(request) {

    const data = await request.formData();

    const database = data.get('database')
    if (!database) {
        return NextResponse.json({ message: "Datos incompletos" }, { status: 400 })
    }
    const file = data.get('file')

    if(file){
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const filepath = path.join(process.cwd(), "public/images", file.name)
        writeFile(filepath, buffer)
        console.log("Imagen guardada en: ", filepath)
    }

    try {

        const platoInfo = {
            nombre: data.get('nombre'),
            categoria: data.get('categoria'),
            subcategoria: data.get('subcategoria'),
            descripcion: data.get('descripcion'),
            precio: data.get('precio'),
            filepath: "/images/"+file.name || ""
        }
        await dbConnect(database)
        let newPlato = await Plato.create(platoInfo)
        if (!newPlato) {
            return NextResponse.json({ message: "No se guardó el plato: "}, { status: 401 })
        }
        return NextResponse.json({ message: "Plato guardado.", plato: newPlato }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: "No se guardo el plato: " + error }, { status: 400 })
    }
}

export async function PUT(request) {

    const data = await request.json()
    // console.log(data)
    if (!data.database) {
        return NextResponse.json({ message: "Datos incompletos" }, { status: 401 })
    }
    try {
        await dbConnect(data.database)
        const platoInfo = {
            _id: data._id,
            nombre: data.nombre,
            categoria: data.categoria,
            subcategoria: data.subcategoria,
            descripcion: data.descripcion,
            precio: data.precio,
        }
        const platoUpdated = await Plato.findOneAndUpdate({_id: data._id}, platoInfo, {new:true})
        if(!platoUpdated){return NextResponse.json({message:"Error: "},{status:401})}
        return NextResponse.json({message:"Plato actualizado", plato: platoUpdated},{status:200})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Error: "+error.message},{stats:401})
    }
}

export async function DELETE(request){
    const {database, plato} = await request.json()
    // console.log(data)
    if (!database) {
        return NextResponse.json({ message: "Datos incompletos" }, { status: 401 })
    }
    try {
        const platoDeleted = await Plato.findOneAndDelete({_id: plato._id})
        if(!platoDeleted){return NextResponse.json({message:"No se eliminó el plato"},{status:401})}
        return NextResponse.json({message:"Plato eliminado correctamente"},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Algo salió mal: "+error.message},{status:402})
    }
}