'use client'
import { createContext, useState, useCallback, useContext, useEffect } from "react"

export const CategoriasContext = createContext()

export const useCategorias = () => {
    return useContext(CategoriasContext)
}
export const CategoriasContextProvider = (props) => {
    const [categorias, setCategorias] = useState([])

    const loadCategorias = useCallback(async (database) => {
        if (database) {
            const response = await fetch("/api/menu/categorias", {
                method: "POST",
                body: JSON.stringify({ database: database }),
            })
            const data = await response.json()
            setCategorias(data.categorias)
            return response;
        }
    }, [])

    const crearCategoria = async (database, categoria) => {
        if (categoria) {
            const res = await fetch("/api/menu/categoria", {
                method: 'POST',
                body: JSON.stringify({ database: database, categoria: categoria }),
            })
            const data = await res.json()
            setCategorias([data.categoria, ...categorias])
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