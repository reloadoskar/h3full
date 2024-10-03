'use client'
import { createContext, useState, useCallback, useContext, } from "react"
import axios from "axios"

export const ClientesContext = createContext()

export const useClientes = () => {
    return useContext(ClientesContext)
}
export const ClientesContextProvider = (props) => {
    const [clientes, setClientes] = useState([])
    const [cliente, setCliente] = useState(null)
    const [verCliente, setVerCliente] = useState(false)
    const [busqueda, setBusqueda] = useState([])

    const loadClientes = useCallback(async (database) => {
        if (database) {
            const response = await axios.post("/api/cliente/s", { database })
            setClientes(response.data.clientes)
            setBusqueda(response.data.clientes)
            return response.data.clientes;
        }
    }, [])

    const createCliente = async (database, data) => {
        const res = await axios.post("/api/cliente/", { database, data })
        setClientes([res.data.cliente, ...clientes ])
        return res
    }

    const updateCliente = async (database, clnt) => {
        const res = await axios.put("/api/cliente/", { database, clnt })
        let clnts = clientes.filter(cl=>cl._id!==clnt._id)
        // console.log(clnts)
        // console.log(res.data)
        setClientes([res.data, ...clnts])
        setBusqueda([res.data, ...clnts])
        return res
    }

    const buscarCliente = (bsqd) => {
        if(bsqd.length > 0){
            let res = clientes.filter(cl=>cl.nombre.includes(bsqd))
            // console.log(res)
            setBusqueda(res)
            return res
        }
        return setBusqueda(clientes)
    }

    return (
        <ClientesContext.Provider value={{
            cliente, setCliente,
            clientes, setClientes,
            loadClientes, updateCliente,
            createCliente, verCliente, setVerCliente,
            buscarCliente, busqueda
        }}>
            {props.children}
        </ClientesContext.Provider>
    )
}