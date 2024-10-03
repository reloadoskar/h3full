'use client'
import { createContext, useState, useCallback, useContext, useEffect } from "react"
import axios from "axios"

export const ReservasContext = createContext()

export const useReservas = () => {
    return useContext(ReservasContext)
}

export const ReservasContextProvider = (props) => {
    const [reservas, setReservas] = useState([])
    const [reservaSelected, setReservaselected] = useState(null)
    const [reservasFounded, setReservasfounded] = useState([])

    const loadReservas = useCallback(async (database) => {
        if (database) {
            const response = await axios.post("/api/reservas", {database: database })
            setReservas(response.data.reservas)
            return response;
        }
    }, [])

    const crearReserva = async (database, reserva) => {
        if (database) {
            const res = await axios.post("/api/reserva", { database, reserva })
            setReservas([res.data.reserva, ...reservas])
            return res
        }
    }

    const selectReserva = (dta) => {
        setReservaselected(dta)
    }

    const editarReserva = async (data) => {
        if (data) {
            const res = await axios.put("/api/reserva", {data})
            let reservaSinOriginal = reservas.filter(rsrv => rsrv._id !== data._id)            
            setReservas([res.data.reserva, reservaSinOriginal])
            return res
        }
    }

    const buscarReserva = (buscarPor, busqueda) => {
        let founded = reservas.filter(r => r[buscarPor].toLowerCase().includes(busqueda.toLowerCase()))
        // console.log(founded)
        setReservasfounded(founded)
        return founded
    }

    const ordenarPorNombre = () => {
        const sortArray = (x, y) => {
            if (x.nombre < y.nombre) {
                return -1;
            }
            if (x.nombre > y.nombre) {
                return 1;
            }
            return 0;
        }
        let s = reservas.sort(sortArray)
        return setReservas(s)
    }

    const ordenarPorFecha = () => {
        
        let s = reservas.sort(sortArray)
        return setReservas(s)
    }

    return (
        <ReservasContext.Provider value={{
            reservas, reservaSelected, selectReserva,
            loadReservas, crearReserva, editarReserva, buscarReserva, reservasFounded,
            ordenarPorNombre,
        }}>
            {props.children}
        </ReservasContext.Provider>
    )
}

export default ReservasContextProvider