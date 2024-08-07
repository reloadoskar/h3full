'use client'
import { createContext, useState, useCallback, useContext, useEffect } from "react"

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
            const response = await fetch("/api/reservas", {
                method: 'POST',
                body: JSON.stringify({ database: database }),
            })
            const data = await response.json()
            setReservas(data.reservas)
            return response;
        }
    }, [])

    const crearReserva = async (database, reserva) => {
        if (database) {
            const res = await fetch("/api/reserva", {
                method: 'POST',
                body: JSON.stringify({ database, reserva }),
            })
            const data = await res.json()
            setReservas([data.reserva, ...reservas])
            return res
        }
    }

    const selectReserva = (dta) => {
        setReservaselected(dta)
    }

    const editarReserva = async (data) => {
        if (data) {
            const res = await fetch("/api/reserva", {
                method: 'PUT',
                body: JSON.stringify(data)
            })
            const dt = await res.json()
            let reservaSinOriginal = reservas.filter(rsrv => rsrv._id !== data._id)
            reservaSinOriginal.push(dt.reserva)
            setReservas(reservaSinOriginal)
            return dt
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