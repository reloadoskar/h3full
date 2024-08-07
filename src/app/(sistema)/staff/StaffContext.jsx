'use client'
import { createContext, useState, useCallback, useContext, useEffect } from "react"

export const StaffContext = createContext()

export const useStaff = () => {
    return useContext(StaffContext)
}

export const StaffContextProvider = (props) => {
    const [staff, setStaff] = useState([])
    const [puestos, setPuestos] = useState([
        {_id:1,nombre:"MESERO"},
        {_id:2, nombre:"CAJAS"},
        {_id:3,nombre:"RECEPCIONISTA"},
        {_id:4, nombre:"COCINERO"}])
    const [staffSelected, setStaffelected] = useState(null)
    const [staffFounded, setStafffounded] = useState([])

    const loadStaff = useCallback(async (database) => {
        if (database) {
            const response = await fetch("/api/staff/s", {
                method: 'POST',
                body: JSON.stringify({ database: database }),
            })
            const data = await response.json()
            setStaff(data.staffs)
            return response;
        }
    }, [])

    const crearStaff = async (dats) => {
        if (dats) {
            const res = await fetch("/api/staff", {
                method: 'POST',
                body: dats,
            })
            const data = await res.json()
            // console.log(data)
            if(data.status === 200 ){
                setStaff([data.staff, ...staff])
            }
            return data
        }
    }

    const selectStaff = (dta) => {
        setStaffelected(dta)
    }

    const editarStaff = async (stf) => {
        if (stf) {
            const res = await fetch("/api/staff", {
                method: 'PUT',
                body: stf
            })
            const dt = await res.json()
            let staffSinOriginal = staff.filter(rsrv => rsrv._id !== stf._id)
            staffSinOriginal.push(dt.staffUpdated)
            setStaff(staffSinOriginal)
            return dt
        }
    }

    const eliminarStaff = async (database, stf) => {
        if(database){
            const res = await fetch("/api/staff", {
                method: "DELETE",
                body: JSON.stringify({database, stf})
            })

            const dt= await res.json()
            let staffMenosEliminado = staff.filter(prevstf => prevstf._id!== stf._id)
            setStaff(staffMenosEliminado)
            return dt
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