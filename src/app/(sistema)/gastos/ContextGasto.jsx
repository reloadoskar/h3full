'use client'
import { createContext, useState, useCallback, useContext } from "react"
import axios from "axios"
export const GastoContext = createContext()

export const useGastos = () => {
    return useContext(GastoContext)
}
export const GastoContextProvider = (props) => {
    const [gastos, setGastos] = useState([])
    const [gastoSeleccionado, setGastosel] = useState(null)
    const [gastosFounded, setGastosFounded] = useState([])
    const [busqueda, setBusqueda] = useState("")
    const [buscarPor, setBuscarpor] = useState("nombre")

    const loadGastos = useCallback(async (database) => {
        if (database) {
            const response = await axios.post("/api/gastos/load", { database })
            setGastos(response.data.gastos)
            return response.data.gastos;
        }
    }, [])

    const crearGasto = async (database, data) => {
        if (data) {
            const res = await axios.post("/api/gastos/", { database, data })
            setGastos([res.data.gasto, ...gastos])
            return res
        }
    }

    const editarGasto = async (data) => {
        if (data) {
            const res = await axios.put("/api/gastos", { data })
            let gastosSO = gastos.filter(plt => plt._id !== data._id)
            setGastos(res.data.gasto, ...gastosSO)
            return res
        }
    }

    const eliminarGasto = async (database, gasto) => {
        const res = await axios.delete("/api/gastos", { database, gasto })
        setGastos(gastos.filter(plt => plt._id !== gasto._id))
        return res
    }

    const selectGasto = (pryct) => {
        setGastosel(pryct)
    }

    const buscarGasto = (buscarPor = "nombre", busqueda) => {
        let founded = gastos.filter(r => r[buscarPor].toLowerCase().includes(busqueda.toLowerCase()))
        // console.log(founded)
        setGastosFounded(founded)
        return founded
    }

    return (
        <GastoContext.Provider value={{
            gastos, setGastos,
            loadGastos, crearGasto, selectGasto, gastoSeleccionado,
            editarGasto, eliminarGasto, buscarGasto, busqueda, setBusqueda, buscarPor, setBuscarpor,
            gastosFounded
        }}>
            {props.children}
        </GastoContext.Provider>
    )
}

export default GastoContextProvider