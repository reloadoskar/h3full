'use client'
import { createContext, useState, useCallback, useContext } from "react"
import axios from "axios"
export const PagoContext = createContext()

export const usePagos = () => {
    return useContext(PagoContext)
}
export const PagoContextProvider = (props) => {
    const [pagos, setPagos] = useState([])
    const [pagoSeleccionado, setPagosel] = useState(null)
    const [pagosFounded, setPagosFounded] = useState([])
    const [busqueda, setBusqueda] = useState("")
    const [buscarPor, setBuscarpor] = useState("nombre")

    const loadPagos = useCallback(async (database) => {
        if (database) {
            const response = await fetch("/api/pagos/load", {
                method: 'POST',
                body:  JSON.stringify({database: database}) ,
            })
            const data = await response.json()
            setPagos(data.pagos)
            return response;
        }
    }, [])

    const crearPago = async (database, data) => {
        if (data) {
            const res = await axios.post("/api/pagos/", { database, data })
            setPagos([res.data.pago, ...pagos])
            return res
        }
    }

    const editarPago = async (data) => {
        if(data){
            const res = await fetch("/api/pagos",{
                method:'PUT',
                body: JSON.stringify(data)
            })
            const dt = await res.json()
            // console.log(dt)
            let pagosSinOriginal = pagos.filter(plt=>plt._id!==data._id)
            pagosSinOriginal.push(dt.pago)
            setPagos(pagosSinOriginal)
            return dt
        }
    }

    const eliminarPago = async (database, pago) =>{
        if(database){
            const res = await fetch("/api/pagos",{
                method: 'DELETE',
                body: JSON.stringify({database, pago})
            })
            const dt = await res.json()
            if(dt){
                setPagos(pagos.filter(plt=>plt._id !== plato._id))
            }
            return dt
        }
    }

    const selectPago = (pryct) =>{
        setPagosel(pryct)
    }

    const buscarPago = (buscarPor="nombre", busqueda) => {
        let founded = pagos.filter(r => r[buscarPor].toLowerCase().includes(busqueda.toLowerCase()))
        // console.log(founded)
        setPagosFounded(founded)
        return founded
    }

    return (
        <PagoContext.Provider value={{
            pagos, setPagos,
            loadPagos, crearPago, selectPago, pagoSeleccionado,
            editarPago, eliminarPago, buscarPago, busqueda, setBusqueda, buscarPor, setBuscarpor, 
            pagosFounded
        }}>
            {props.children}
        </PagoContext.Provider>
    )
}

export default PagoContextProvider