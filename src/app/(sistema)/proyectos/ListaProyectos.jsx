import { useState } from "react";
import { useProyectos } from "./ContextProyecto";
import Modal from "@/components/Modal";
import Proyecto from "./Proyecto";
import { numeroFormateado } from "@/utils/tools";
import moment from "moment";

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
            <div className="">
                Proyectos del mes: {proyectos.length}
            </div>
            <div className="md:flex dark:bg-gray-800 bg-gray-300 px-2 hidden ">
                <div className="basis-2/12">Fecha</div>
                <div className="basis-4/12">Cliente</div>
                <div className="basis-3/12">Proyecto</div>
                <div className="basis-1/12 text-right">Presupuesto</div>
                <div className="basis-1/12 text-right">Pagado</div>
                <div className="basis-1/12 text-right">Saldo</div>
            </div>
            {proyectos.map(proyecto => (
                <div key={proyecto._id} className="flex md:flex-row flex-col px-4 md:px-2 md:pt-0 pt-4 cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-400 odd:bg-gray-200 dark:odd:bg-gray-600" onClick={() => handleClick(proyecto)}>
                    <div className="basis-2/12 text-right md:text-left">{moment(proyecto.createdAt).format("DD-MM-YYYY")}</div>
                    <div className="basis-4/12 text-xl font-medium md:text-base md:font-normal">{proyecto.cliente.nombre}</div>
                    <div className="basis-3/12">{proyecto.nombre}</div>
                    <div className="md:hidden">{proyecto.descripcion}</div>
                    <div className="md:basis-1/12 basis-full text-right ">
                        <span className="md:hidden">Presupuesto: </span>
                        {numeroFormateado(proyecto.presupuesto)}
                    </div>
                    <div className="basis-1/12 text-right"><span className="md:hidden">Pagado: </span> {numeroFormateado( proyecto.pagos.reduce((t,p)=>t+=p.importe,0) )}</div>
                    <div className="basis-1/12 text-right border-none border-t border-gray-400 md:border-0"><span className="md:hidden">Saldo: </span>{numeroFormateado(proyecto.presupuesto - proyecto.pagos.reduce((t,p)=>t+=p.importe,0) )}</div>
                </div>
            ))}
            <div className="md:flex px-2 border-t border-gray-900 dark:border-gray-400 hidden md:visible">
                <div className="basis-9/12 text-right">total:</div>
                <div className="basis-1/12 text-right">{totalProyectos}</div>
                <div className="basis-1/12 text-right">{totalPagado}</div>
                <div className="basis-1/12 text-right">{totalSaldo}</div>
            </div>
            <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
                <Proyecto />
                <button className="botonrojo" onClick={() => setOpenModal(false)}>cerrar</button>
            </Modal>
        </div>
}
