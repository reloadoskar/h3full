'use client'
import { createContext, useState, useCallback, useContext, useEffect } from "react"

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
            const response = await fetch("/api/pedidos", {
                method: 'POST',
                body: JSON.stringify({ database: database }),
            })
            const data = await response.json()
            setPedidos(data.pedidos)
            return response;
        }
    }, [])

    const crearPedido = async (database, pedido) => {
        if (database) {
            const res = await fetch("/api/pedido", {
                method: 'POST',
                body: JSON.stringify({ database, pedido }),
            })
            const data = await res.json()
            setPedidos([data.pedido, ...pedidos])
            return res
        }
    }

    const selectPedido = (dta) => {
        setPedidoselected(dta)
    }

    const editarPedido = async (data) => {
        if (data) {
            const res = await fetch("/api/pedido", {
                method: 'PUT',
                body: JSON.stringify(data)
            })
            const dt = await res.json()
            let pedidoSinOriginal = pedidos.filter(rsrv => rsrv._id !== data._id)
            pedidoSinOriginal.push(dt.pedido)
            setPedidos(pedidoSinOriginal)
            return dt
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