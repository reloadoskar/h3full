'use client'
import { createContext, useState, useCallback, useContext, useEffect } from "react"
import axios from "axios"

export const StaffContext = createContext()

export const useStaff = () => {
    return useContext(StaffContext)
}

export const StaffContextProvider = (props) => {
    const [staff, setStaff] = useState([])
    const [puestos, setPuestos] = useState([
        { _id: 1, nombre: "MESERO" },
        { _id: 2, nombre: "CAJAS" },
        { _id: 3, nombre: "RECEPCIONISTA" },
        { _id: 4, nombre: "COCINERO" }])
    const [staffSelected, setStaffelected] = useState(null)
    const [staffFounded, setStafffounded] = useState([])

    const loadStaff = useCallback(async (database) => {
        if (database) {
            const response = await axios.post("/api/staff/s", {database})
            setStaff(response.data.staffs)
            return response;
        }
    }, [])

    const crearStaff = async (dats) => {
        if (dats) {
            const res = await axios.post("/api/staff", dats)
            setStaff([res.data.staff, ...staff])
            return res
        }
    }

    const selectStaff = (dta) => {
        setStaffelected(dta)
    }

    const editarStaff = async (stf) => {
        if (stf) {
            const res = await axios.put("/api/staff", stf)
            let staffSinOriginal = staff.filter(rsrv => rsrv._id !== stf._id)
            setStaff([res.data.staff, staffSinOriginal])
            return res
        }
    }

    const eliminarStaff = async (database, stf) => {
        if (database) {
            const res = await axios.delete("/api/staff", {database, stf })
            setStaff(staff.filter(prevstf => prevstf._id !== stf._id))
            return res
        }
    }

    const buscarStaff = (buscarPor, busqueda) => {
        let founded = staff.filter(r => r[buscarPor].toLowerCase().includes(busqueda.toLowerCase()))
        // console.log(founded)
        setStafffounded(founded)
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
        let s = staff.sort(sortArray)
        return setStaff(s)
    }

    const ordenarPorFecha = () => {

        let s = staff.sort(sortArray)
        return setStaff(s)
    }

    return (
        <StaffContext.Provider value={{
            staff, staffSelected, selectStaff,
            loadStaff, crearStaff, editarStaff, eliminarStaff, buscarStaff, staffFounded,
            ordenarPorNombre, puestos,
        }}>
            {props.children}
        </StaffContext.Provider>
    )
}

export default StaffContextProvider