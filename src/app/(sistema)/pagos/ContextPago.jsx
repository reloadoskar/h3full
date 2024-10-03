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
            const response = await axios.post("/api/pagos/load", { database })
            setPagos(response.data.pagos)
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
        if (data) {
            const res = await axios.put("/api/pagos", { data })
            let pagosSinOriginal = pagos.filter(plt => plt._id !== data._id)
            setPagos([res.data.pago, pagosSinOriginal])
            return res
        }
    }

    const eliminarPago = async (database, pago) => {
        if (database) {
            const res = await axios.delete("/api/pagos", { database, pago })
            setPagos(pagos.filter(pg => pg._id !== pago._id))
            return res
        }
    }

    const selectPago = (pryct) => {
        setPagosel(pryct)
    }

    const buscarPago = (buscarPor = "nombre", busqueda) => {
        let founded = pagos.filter(r => r[buscarPor].toLowerCase().includes(busqueda.toLowerCase()))
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