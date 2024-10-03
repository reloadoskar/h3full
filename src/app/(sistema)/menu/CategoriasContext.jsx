'use client'
import { createContext, useState, useCallback, useContext, useEffect } from "react"
import axios from "axios"
export const CategoriasContext = createContext()

export const useCategorias = () => {
    return useContext(CategoriasContext)
}
export const CategoriasContextProvider = (props) => {
    const [categorias, setCategorias] = useState([])

    const loadCategorias = useCallback(async (database) => {
        if (database) {
            const response = await axios.post("/api/menu/categorias", { database })            
            setCategorias(response.data.categorias)
            return response;
        }
    }, [])

    const crearCategoria = async (database, categoria) => {
        if (categoria) {
            const res = await axios.post("/api/menu/categoria", {database, categoria})
            setCategorias([res.data.categoria, ...categorias])
            return res
        }
    }

    return (
        <CategoriasContext.Provider value={{
            categorias,
            loadCategorias, crearCategoria
        }}>
            {props.children}
        </CategoriasContext.Provider>
    )
}

export default CategoriasContextProvider