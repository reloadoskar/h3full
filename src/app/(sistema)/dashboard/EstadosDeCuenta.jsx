import { useState, useEffect } from "react";
import { useClientes } from "../clientes/ClientesContext"
import { usePagos } from "../pagos/ContextPago"
import { useProyectos } from "../proyectos/ContextProyecto"
import { numeroFormateado } from "@/utils/tools";
import EdcCliente from "./EdcCliente";

export default function EstadoDeCuenta() {
    const { clientes } = useClientes()
    const { proyectos } = useProyectos()
    const { pagos } = usePagos()
    const [estadoDeCuenta, setEdc] = useState([])
    

    useEffect(() => {
        if (clientes.length > 0) {
            let clientesPrycts = []
            clientes.forEach(cliente => {
                let proyectosCliente = proyectos.filter(pr => pr.cliente._id === cliente._id)
                // console.log(proyectosCliente)
                let clientePagos = pagos.filter(pg => pg.cliente === cliente._id)
                let totalPresupuesto = proyectosCliente.reduce((ttl, pr) => ttl += pr.presupuesto, 0)
                let totalPagos = clientePagos.reduce((tt, pag) => tt += pag.importe, 0)
                clientesPrycts.push({ cliente: cliente, proyectos: proyectosCliente, presupuesto: totalPresupuesto, pagos: clientePagos, totalPagos: totalPagos, saldo : totalPresupuesto-totalPagos })
            });
            return setEdc(clientesPrycts)
        }
    }, [clientes, proyectos, pagos])

    return estadoDeCuenta.length > 0 ?
        <div className="p-2 my-2 md:my-4 md:p-6 border-gray-700 border-2  ">
            <div className="flex flex-col">
                <h1 className="titulo">Estados de Cuenta</h1>
                <div className="flex gap-2 bg-gray-800 px-4">
                    <div className="basis-1/4">Cliente</div>
                    <div className="basis-1/4 text-right">Presupuesto</div>
                    <div className="basis-1/4 text-right">Pagos</div>
                    <div className="basis-1/4 text-right">Saldo</div>
                </div>
                {estadoDeCuenta.sort((a,b)=> new Date(a.fecha) - new Date(b.fecha) ).map(edc => (
                    <EdcCliente edc={edc} key={edc.cliente._id} />                    
                ))}
                <div className="flex gap-2 px-4 bg-gray-800 ">
                    <div className="basis-1/4 text-right">Totales:</div>
                    <div className="basis-1/4 text-right">{numeroFormateado(estadoDeCuenta.reduce((ttl,cl)=>ttl+=cl.presupuesto,0))}</div>
                    <div className="basis-1/4 text-right">{numeroFormateado(estadoDeCuenta.reduce((ttl,cl)=>ttl+=cl.totalPagos,0))}</div>
                    <div className="basis-1/4 text-right">{numeroFormateado(estadoDeCuenta.reduce((ttl,cl)=>ttl+=cl.saldo,0))}</div>
                </div>
            </div>
        </div>
        : <p>No se encontraron resultados</p>
}
