'use client'
import { createContext, useState, useCallback, useContext, useEffect } from "react"
import axios from "axios"
export const SubcategoriasContext = createContext()

export const useSubcategorias = () => {
    return useContext(SubcategoriasContext)
}

export const SubcategoriasContextProvider = (props) => {
    const [subcategorias, setSubcategorias] = useState([])
    
    const loadSubcategorias = useCallback(async (database) => { 
        if(database){
            const response = await axios.post("/api/menu/subcategorias",{database})
            setSubcategorias(response.data.subcategorias)
            return response; 
        }
    }, [])

    const crearSubcategoria = async (database, subcategoria) =>{
        if(database){
            const res = await axios.post("/api/menu/subcategoria",{database, subcategoria})
            setSubcategorias([data.subcategoria, ...subcategorias])
            return res
        }
    }

    return(
        <SubcategoriasContext.Provider value={{
            subcategorias,
            loadSubcategorias, crearSubcategoria
        }}>
            {props.children}
        </SubcategoriasContext.Provider>
    )
}

export default SubcategoriasContextProvider