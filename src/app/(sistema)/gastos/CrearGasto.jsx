import { useState } from "react"
import { useGastos } from "./ContextGasto"

export default function CrearGasto({ proyecto, setaddGasto }) {
    const db="contratista"
    const {crearGasto} = useGastos()
    const [guardando, setGuardando] = useState(false)
    const [descripcion, setDescripcion] = useState("")
    const [fecha, setFecha] = useState("")
    const [importe, setImporte] = useState(0)
    const handleSubmit = async (e) => {
        e.preventDefault()
        setGuardando(true)
        let newGasto = {
            proyecto: proyecto._id,
            fecha: fecha,
            descripcion: descripcion,
            importe: importe
        }
        await crearGasto(db, newGasto).then(() => {
            setGuardando(false)
            setaddGasto(false)
        }).catch(e => console.log(e))
    }
    return (
        <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex p-4 my-4 gap-4 border border-gray-700 rounded-md w-full">
                {guardando ?
                    <p className="titulo mx-auto animate-pulse">Guardando...</p>
                    : <>
                        <div className="absolute top-0 -right-2">
                            <button onClick={() => setaddGasto(false)} className="transition duration-700 ease-in-out rounded-full bg-gray-600 px-2 font-black text-gray-700 hover:text-gray-200">X</button>
                        </div>
                        <input id="descripcion" 
                            type="text" 
                            className="inputbasico basis-3/6" 
                            placeholder="Descripción" 
                            min={4}
                            required
                            value={descripcion}
                            onChange={(e)=>setDescripcion(e.target.value)}
                        />
                        <input id="fecha"
                            type="date"
                            className="inputbasico basis-1/6"
                            required
                            value={fecha}
                            onChange={(e)=>setFecha(e.target.value)}
                        />
                        <input id="importe" 
                            className="inputbasico basis-1/6" 
                            placeholder="0.00" 
                            type="number" 
                            required 
                            min={1} 
                            value={importe}
                            onChange={(e)=>setImporte(e.target.value)}
                        />

                        <button className="boton basis-1/6">guardar gasto</button>
                    </>
                }
            </div>
        </form>
    )
}
