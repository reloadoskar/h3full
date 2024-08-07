'use client'
import { createContext, useState, useCallback, useContext, useEffect } from "react"

export const SubcategoriasContext = createContext()

export const useSubcategorias = () => {
    return useContext(SubcategoriasContext)
}
export const SubcategoriasContextProvider = (props) => {
    const [subcategorias, setSubcategorias] = useState([])
    
    const loadSubcategorias = useCallback(async (database) => { 
        if(database){
            const response = await fetch("/api/menu/subcategorias",{
                method: 'POST',
                body: JSON.stringify({database:database}),
            })  
            const data = await response.json()
            setSubcategorias(data.subcategorias)
            return response; 
        }
    }, [])

    const crearSubcategoria = async (database, subcategoria) =>{
        if(database){
            const res = await fetch("/api/menu/subcategoria",{
                method: 'POST',
                body: JSON.stringify({database, subcategoria}),
            } )  
            const data = await res.json()
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