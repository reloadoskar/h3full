'use client'
import { createContext, useState, useCallback, useContext, useEffect } from "react"
import axios from "axios"

export const PedidosContext = createContext()

export const usePedidos = () => {
    return useContext(PedidosContext)
}

export const PedidosContextProvider = (props) => {
    const [pedidos, setPedidos] = useState([])
    const [pedidoSelected, setPedidoselected] = useState(null)
    const [pedidosFounded, setPedidosfounded] = useState([])

    const loadPedidos = useCallback(async (database) => {
        if (database) {
            const response = await axios.post("/api/pedidos", {database: database })
            setPedidos(response.data.pedidos)
            return response;
        }
    }, [])

    const crearPedido = async (database, pedido) => {
        if (database) {
            const res = await axios.post("/api/pedido", { database, pedido })            
            setPedidos([res.data.pedido, ...pedidos])
            return res
        }
    }

    const selectPedido = (dta) => {
        setPedidoselected(dta)
    }

    const editarPedido = async (data) => {
        if (data) {
            const res = await axios.put("/api/pedido", {data})
            let pedidoSinOriginal = pedidos.filter(rsrv => rsrv._id !== data._id)            
            setPedidos([res.data.pedido, pedidoSinOriginal])
            return res
        }
    }

    const buscarPedido = (buscarPor, busqueda) => {
        let founded = pedidos.filter(r => r[buscarPor].toLowerCase().includes(busqueda.toLowerCase()))
        // console.log(founded)
        setPedidosfounded(founded)
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
        let s = pedidos.sort(sortArray)
        return setPedidos(s)
    }

    const ordenarPorFecha = () => {
        let s = pedidos.sort(sortArray)
        return setPedidos(s)
    }

    return (
        <PedidosContext.Provider value={{
            pedidos, pedidoSelected, selectPedido,
            loadPedidos, crearPedido, editarPedido, buscarPedido, pedidosFounded,
            ordenarPorNombre,
        }}>
            {props.children}
        </PedidosContext.Provider>
    )
}

export default PedidosContextProvider