'use client'
import axios from "axios"
import { createContext, useState, useCallback, useContext, useEffect } from "react"

export const UbicacionsContext = createContext()

export const useUbicacions = () => {
    return useContext(UbicacionsContext)
}
export const UbicacionsContextProvider = (props) => {
    const [ubicacions, setUbicacions] = useState([]) //MODIFICAERRRRRRRR
    const [ubicacion, setUbicacion] = useState(null)

    const loadUbicacions = useCallback(async (database) => {
        if (database) {
            const response = await axios.post("/api/ubicacion/s", { database })
            setUbicacions(response.data.ubicacions)
            return response;
        }
    }, [])

    const updateUbicacion = async (database, ub) =>{
        const res = await axios.put("/api/ubicacion/update",{database, ub})
        return res
    }

    return (
        <UbicacionsContext.Provider value={{
            ubicacion, setUbicacion,
            ubicacions, setUbicacions,
            loadUbicacions, updateUbicacion
        }}>
            {props.children}
        </UbicacionsContext.Provider>
    )
}