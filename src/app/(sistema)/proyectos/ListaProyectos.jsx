import { useState } from "react";
import { useProyectos } from "./ContextProyecto";
import Modal from "@/components/Modal";
import Proyecto from "./Proyecto";
import { numeroFormateado } from "@/utils/tools";

export default function ListaProyectos({ proyectos }) {
    const { selectProyecto, proyectoSeleccionado } = useProyectos()
    const [openModal, setOpenModal] = useState(false)
    const totalProyectos = proyectos.reduce((ttl, pr) => ttl += pr.presupuesto,0)
    const totalPagado = proyectos.reduce((t,p)=>t += p.pagos.reduce((tp,pg)=>tp+=pg.importe,0),0)
    const totalSaldo = totalProyectos - totalPagado 
    const handleClick = (p) => {
        selectProyecto(p)
        setOpenModal(true)
    }
    return !proyectos ?
        <p className="titulo">No hay proyectos registrados</p>
        :
        <div className="contenedor overflow-auto md:block">
            <div className="px-2">
                Proyectos del mes: {proyectos.length}
            </div>
            <div className="md:flex dark:bg-gray-800 bg-gray-300 px-2 hidden ">
                <div className="basis-2/6">Cliente</div>
                <div className="basis-1/6">Proyecto</div>
                <div className="basis-1/6 text-right">Presupuesto</div>
                <div className="basis-1/6 text-right">Pagado</div>
                <div className="basis-1/6 text-right">Saldo</div>
            </div>
            {proyectos.map(proyecto => (
                <div key={proyecto._id} className="flex md:flex-row flex-col px-4 md:px-2 md:pt-0 pt-4 gap-4 cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-400 odd:bg-gray-200 dark:odd:bg-gray-600" onClick={() => handleClick(proyecto)}>
                    <div className="basis-2/6 text-2xl font-bold md:text-base md:font-thin">{proyecto.cliente}</div>
                    <div className="basis-1/6">{proyecto.nombre}</div>
                    <div className="basis-1/6 text-right">{numeroFormateado(proyecto.presupuesto)}</div>
                    <div className="basis-1/6 text-right">{numeroFormateado( proyecto.pagos.reduce((t,p)=>t+=p.importe,0) )}</div>
                    <div className="basis-1/6 text-right border-0 border border-t border-gray-400 md:border-0">{numeroFormateado(proyecto.presupuesto - proyecto.pagos.reduce((t,p)=>t+=p.importe,0) )}</div>

                </div>
            ))}
            <div className="md:flex px-2 border-t border-gray-900 dark:border-gray-400 hidden md:visible">
                <div className="basis-3/6 text-right">total:</div>
                <div className="basis-1/6 text-right">{totalProyectos}</div>
                <div className="basis-1/6 text-right">{totalPagado}</div>
                <div className="basis-1/6 text-right">{totalSaldo}</div>
            </div>
            <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
                <Proyecto proyecto={proyectoSeleccionado} />
                <button className="botonrojo" onClick={() => setOpenModal(false)}>cerrar</button>
            </Modal>
        </div>
}
