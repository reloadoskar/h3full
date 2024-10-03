'use client'
import { createContext, useState, useCallback, useContext, useEffect } from "react"
import axios from "axios"

export const MenuContext = createContext()

export const useMenu = () => {
    return useContext(MenuContext)
}
export const MenuContextProvider = (props) => {
    const [menu, setMenu] = useState([])
    const [plato, setPlato] = useState(null)
    const [platos, setPlatos] = useState([])
    const [platoSeleccionado, setPlatosel] = useState(null)
    const [platosFounded, setPlatosFounded] = useState([])
    const [busqueda, setBusqueda] = useState("")
    const [buscarPor, setBuscarpor] = useState("nombre")

    const loadPlatos = useCallback(async (database) => {
        if (database) {
            const response = await axios.post("/api/plato/s", {database})
            setPlatos(response.data.platos)
            return response;
        }
    }, [])

    const crearPlato = async (data) => {
        if (data) {
            const res = await axios.post("/api/plato", {data})            
            setMenu([res.data.plato, ...platos])
            return res
        }
    }

    const editarPlato = async (data) => {
        if(data){
            const res = await axios.put("/api/plato",{data})
            let platosSinOriginal = menu.filter(plt=>plt._id!==data._id)
            setMenu([res.data.plato, platosSinOriginal])
            return res
        }
    }

    const eliminarPlato = async (database, plato) =>{
        if(database){
            const res = await axios.delete("/api/plato",{database, plato})
            setMenu(platos.filter(plt=>plt._id !== plato._id))
            return res
        }
    }

    const selectPlato = (plt) =>{
        setPlatosel(plt)
    }

    const buscarPlato = (buscarPor="nombre", busqueda) => {
        let founded = menu.filter(r => r[buscarPor].toLowerCase().includes(busqueda.toLowerCase()))
        // console.log(founded)
        setPlatosFounded(founded)
        return founded
    }

    return (
        <MenuContext.Provider value={{
            menu,
            loadPlatos, crearPlato, selectPlato, platoSeleccionado,
            editarPlato, eliminarPlato, buscarPlato, busqueda, setBusqueda, buscarPor, setBuscarpor, platosFounded
        }}>
            {props.children}
        </MenuContext.Provider>
    )
}

export default MenuContextProvider