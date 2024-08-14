import { useState, useEffect } from "react"
import { usePagos } from "./ContextPago"
import { useAuth } from "@/components/AuthContext"

export default function CrearPago({ proyecto, setaddPago }) {

    const {user} = useAuth()
    const [database , setDatabase] = useState("")

    const { crearPago } = usePagos()
    const [guardando, setGuardando] = useState(false)
    const [fecha, setFecha] = useState(new Date())
    const [importe, setImporte] = useState(0)
    const [tipoPago, setTipopago] = useState("")

    useEffect(() => {
        if (user) {
            setDatabase(user.database)
        }
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault()
        let newPago = {
            cliente: proyecto.cliente,
            proyecto: proyecto._id,
            fecha: fecha,
            tipoPago: tipoPago,
            importe: importe
        }
        await crearPago(database, newPago).then(() => {
            setGuardando(false)
            setaddPago(false)
        }).catch(e => console.log(e))
    }
    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col md:flex-row p-4 my-4 gap-4 border border-gray-900 rounded-md w-full">
                {guardando ? <p className="titulo mx-auto">guardando...</p> :
                    <>
                        <div className="absolute -top-0 -right-2">
                            <button onClick={() => setaddPago(false)} className="transition duration-700 ease-in-out rounded-full bg-gray-600 px-2 font-black text-gray-700 hover:text-gray-200">X</button>
                        </div>
                        <input id="fecha"
                            className="inputbasico basis-1/4"
                            type="date"
                            required
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                        />
                        <select id="tipopago"
                            className="inputbasico basis-1/4"
                            required
                            value={tipoPago}
                            onChange={(e) => setTipopago(e.target.value)}
                        >
                            <option value="EFECTIVO">EFECTIVO</option>
                            <option value="DEPOSITO">DEPOSITO</option>
                            <option value="TRANSFERENCIA">TRANSFERENCIA</option>
                        </select>
                        <input id="importe"
                            className="inputbasico basis-1/4"
                            required
                            type="number"
                            min={1}
                            value={importe}
                            onChange={(e) => setImporte(e.target.value)}
                        />
                        <button className="boton basis-auto">guardar pago</button>
                    </>
                }
            </div>
        </form>
    )
}
