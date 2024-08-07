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
            const response = await fetch("/api/gastos/load", {
                method: 'POST',
                body:  JSON.stringify({database: database}) ,
            })
            const data = await response.json()
            setGastos(data.gastos)
            return response;
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
        if(data){
            const res = await fetch("/api/gastos",{
                method:'PUT',
                body: JSON.stringify(data)
            })
            const dt = await res.json()
            // console.log(dt)
            let gastosSinOriginal = gastos.filter(plt=>plt._id!==data._id)
            gastosSinOriginal.push(dt.gasto)
            setGastos(gastosSinOriginal)
            return dt
        }
    }

    const eliminarGasto = async (database, gasto) =>{
        if(database){
            const res = await fetch("/api/gastos",{
                method: 'DELETE',
                body: JSON.stringify({database, gasto})
            })
            const dt = await res.json()
            if(dt){
                setGastos(gastos.filter(plt=>plt._id !== plato._id))
            }
            return dt
        }
    }

    const selectGasto = (pryct) =>{
        setGastosel(pryct)
    }

    const buscarGasto = (buscarPor="nombre", busqueda) => {
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