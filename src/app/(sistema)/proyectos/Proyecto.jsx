import { useEffect, useState } from "react"
import CrearPago from "../pagos/CrearPago"
import CrearGasto from "../gastos/CrearGasto"
import { numeroFormateado } from "@/utils/tools"
import { useProyectos } from "./ContextProyecto"

export default function Proyecto({  }) {
    const {proyectoSeleccionado: proyecto} = useProyectos()
    const [addPago, setaddPago] = useState(false)
    const [addGasto, setaddGasto] = useState(false)
    const [activeTab, setActivetab] = useState(0)
    const [tpagos, setTpagos] = useState(0)
    const [tgastos, setTgastos] = useState(0)

    useEffect(() => {
        setTpagos(proyecto.pagos.reduce((ttl, pg) => ttl += pg.importe, 0))
        setTgastos(proyecto.gastos.reduce((ttl, gs) => ttl += gs.importe, 0))
    }, [proyecto])

    return (
        <div key={proyecto._id} className="flex flex-col">

            <div className="flex basis-4/4 gap-4 justify-end">
                <div className='mx-auto'>
                    <ul className='flex gap-4'>
                        <li className={activeTab == 0 ? 'tabselected' : 'tab'} onClick={() => setActivetab(0)}>Proyecto</li>
                        <li className={activeTab == 1 ? 'tabselected' : 'tab'} onClick={() => setActivetab(1)}>Pagos</li>
                        <li className={activeTab == 2 ? 'tabselected' : 'tab'} onClick={() => setActivetab(2)}>Gastos</li>
                    </ul>
                </div>

            </div>

            <div>

                <section className="tabsection">
                    {activeTab === 0 &&
                        <div>
                            <div className="flex flex-col basis-1/4">
                                <div className="titulo py-0 -my-2">{proyecto.nombre}</div>
                                <div className="font-bold text-sm">{proyecto.cliente}</div>
                            </div>

                            <div className="flex p-2 my-2 border border-gray-600 rounded-lg" >
                                {proyecto.descripcion}
                            </div>
                            <div className="flex">
                                <p className="basis-3/4 text-right">Presupuesto:</p>
                                <div className="basis-1/4 text-right">${numeroFormateado(proyecto.presupuesto)}</div>
                            </div>
                            <div className="flex">
                                <div className="basis-3/4 text-right">
                                    pagos: ({proyecto.pagos.length}):
                                </div>
                                <div className="basis-1/4 text-right">
                                    ${numeroFormateado(tpagos)}
                                </div>

                            </div>
                            <div className="flex">
                                <div className="basis-3/4 text-right">
                                    Saldo:
                                </div>
                                <div className="basis-1/4 text-right border-t border-gray-600">
                                    ${numeroFormateado(proyecto.presupuesto - tpagos)}
                                </div>
                            </div>
                            <div className="flex">
                                <div className="basis-3/4 text-right">
                                    Gastos:
                                </div>
                                <div className="basis-1/4 text-right">
                                    ${numeroFormateado(tgastos)}
                                </div>
                            </div>
                            <div className="flex">
                                <div className="basis-3/4 text-right">
                                    Utilidad:
                                </div>
                                <div className="basis-1/4 text-right">
                                    ${numeroFormateado(proyecto.presupuesto - tgastos)}
                                </div>
                            </div>

                        </div>
                    }

                    {activeTab === 1 &&
                        <div className="flex flex-col gap-2">
                            {proyecto.pagos.length > 0 ?
                                proyecto.pagos.map(pago => (
                                    <div className="flex gap-2 w-full dark:odd:bg-gray-600 odd:bg-gray-300" key={pago._id}>
                                        <div className="basis-2/4" >{pago.fecha} </div>
                                        <div className="basis-1/4" >{pago.tipo} </div>
                                        <div className="basis-1/4 text-right">{numeroFormateado(pago.importe)}</div>
                                    </div>
                                ))
                                : null
                            }
                            <div className="flex w-full justify-end">
                                <div className="basis-1/4 border-t border-gray-700 dark:border-gray-900 text-right">
                                    { numeroFormateado(tpagos)}
                                </div>
                            </div>

                            <div className="flex flex-row gap-4 relative">
                                {addPago ?
                                    <CrearPago proyecto={proyecto} setaddPago={setaddPago} />
                                    :
                                    <button className="boton" onClick={() => setaddPago(true)}>agregar pago</button>
                                }
                            </div>
                        </div>
                    }

                    {activeTab === 2 &&
                        <div className="flex flex-col gap-2">
                            {proyecto.gastos.length > 0 ?
                                proyecto.gastos.map(gasto => (
                                    <div className="flex gap-2 w-full dark:odd:bg-gray-600 odd:bg-gray-300" key={gasto._id}>
                                        <div className="basis-1/4" >{gasto.fecha} </div>
                                        <div className="basis-2/4" >{gasto.descripcion} </div>
                                        <div className="basis-1/4 text-right">{ numeroFormateado(gasto.importe)}</div>
                                    </div>
                                ))
                                : null
                            }
                            <div className="flex w-full justify-end">
                                <div className="basis-1/4 border-t border-gray-700 dark:border-gray-900 text-right">
                                    { numeroFormateado( tgastos )}
                                </div>
                            </div>

                            <div className="flex flex-row gap-4 relative">
                                {addGasto ?
                                    <CrearGasto proyecto={proyecto} setaddGasto={setaddGasto} />
                                    :
                                    <button className="boton" onClick={() => setaddGasto(true)}>agregar gasto</button>
                                }
                            </div>
                        </div>
                        // <button className="boton" onClick={() => setaddGasto(true)}>agregar gasto</button>
                    }
                </section>
            </div>
        </div>
    )
}
