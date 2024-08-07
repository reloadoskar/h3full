'use client'
import { createContext, useState, useCallback, useContext } from "react"

export const ProyectoContext = createContext()

export const useProyectos = () => {
    return useContext(ProyectoContext)
}
export const ProyectoContextProvider = (props) => {
    const [proyectos, setProyectos] = useState([])
    const [proyectoSeleccionado, setProyectosel] = useState(null)
    const [proyectosFounded, setProyectosFounded] = useState([])
    const [busqueda, setBusqueda] = useState("")
    const [buscarPor, setBuscarpor] = useState("nombre")

    const loadProyectos = useCallback(async (database) => {
        if (database) {
            const response = await fetch("/api/proyectos/load", {
                method: 'POST',
                body:  JSON.stringify({database: database}) ,
            })
            const data = await response.json()
            setProyectos(data.proyectos)
            return response;
        }
    }, [])

    const crearProyecto = async (data) => {
        if (data) {
            const res = await fetch("/api/proyectos", {
                method: "POST",
                body: data
            })
            const dt = await res.json()
            setProyectos([dt.proyecto, ...proyectos])
            return dt
        }
    }

    const editarProyecto = async (data) => {
        if(data){
            const res = await fetch("/api/proyectos",{
                method:'PUT',
                body: JSON.stringify(data)
            })
            const dt = await res.json()
            // console.log(dt)
            let proyectosSinOriginal = proyectos.filter(plt=>plt._id!==data._id)
            proyectosSinOriginal.push(dt.proyecto)
            setProyectos(proyectosSinOriginal)
            return dt
        }
    }

    const eliminarProyecto = async (database, proyecto) =>{
        if(database){
            const res = await fetch("/api/proyectos",{
                method: 'DELETE',
                body: JSON.stringify({database, proyecto})
            })
            const dt = await res.json()
            if(dt){
                setProyectos(proyectos.filter(plt=>plt._id !== plato._id))
            }
            return dt
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

    return (
        <ProyectoContext.Provider value={{
            proyectos,
            loadProyectos, crearProyecto, selectProyecto, proyectoSeleccionado,
            editarProyecto, eliminarProyecto, buscarProyecto, busqueda, setBusqueda, buscarPor, setBuscarpor, 
            proyectosFounded
        }}>
            {props.children}
        </ProyectoContext.Provider>
    )
}

export default ProyectoContextProvider