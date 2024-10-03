'use client'
import { createContext, useState, useCallback, useContext } from "react"
import axios from "axios"

export const ProyectoContext = createContext()

export const useProyectos = () => {
    return useContext(ProyectoContext)
}

export const ProyectoContextProvider = (props) => {
    const [proyectos, setProyectos] = useState([])
    const [proyectosFounded, setProyectosFounded] = useState([])

    const [proyectoSeleccionado, setProyectosel] = useState(null)
    
    const [busqueda, setBusqueda] = useState("")
    const [buscarPor, setBuscarpor] = useState("nombre")

    const loadProyectos = useCallback(async (database) => {
        if (database) {
            const response = await axios.post("/api/proyectos/load", {database: database})
            setProyectos(response.data.proyectos)
            return response;
        }
    }, [])

    const crearProyecto = async (database, proyecto) => {
        if (proyecto) {
            const res = await axios.post("/api/proyectos", {database, proyecto})
            setProyectos([res.data.proyecto, ...proyectos])
            return res
        }
    }

    const editarProyecto = async (data) => {
        if(data){
            const res = await axios.put("/api/proyectos",{data})
            let proyectosSinOriginal = proyectos.filter(plt=>plt._id!==data._id)
            setProyectos([res.data.proyecto, proyectosSinOriginal])
            return res
        }
    }

    const eliminarProyecto = async (database, proyecto) =>{
        if(database){
            const res = await axios.delete("/api/proyectos",{database, proyecto})
            setProyectos(proyectos.filter(plt=>plt._id !== proyecto._id))            
            return res
        }
    }

    const selectProyecto = (pryct) =>{
        setProyectosel(pryct)
    }

    const buscarProyecto = (buscarPor="nombre", busqueda) => {
        let founded = proyectos.filter(r => r[buscarPor].toLowerCase().includes(busqueda.toLowerCase()))
        // console.log(founded)
        setProyectosFounded(founded)
        return founded
    }

    const crearPago = async (database, data) => {
        if (data) {
            const res = await axios.post("/api/pagos/", { database, data })
            let np = proyectoSeleccionado
                np.pagos.push(res.data.pago)
            setProyectosel(np)
            return res
        }
    }
    const crearGasto = async (database, data) => {
        if (data) {
            const res = await axios.post("/api/gastos/", { database, data })
            let ng = proyectoSeleccionado
                ng.gastos.push(res.data.gasto)
                setProyectosel(ng)
            // setGastos([res.data.gasto, ...gastos])
            return res
        }
    }

    return (
        <ProyectoContext.Provider value={{
            proyectos,
            loadProyectos, crearProyecto, selectProyecto, proyectoSeleccionado,
            editarProyecto, eliminarProyecto, buscarProyecto, busqueda, setBusqueda, buscarPor, setBuscarpor, 
            proyectosFounded,
            crearPago, crearGasto
        }}>
            {props.children}
        </ProyectoContext.Provider>
    )
}

export default ProyectoContextProvider