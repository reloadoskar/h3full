import { useEffect, useState } from "react"
import CrearPago from "../pagos/CrearPago"
import CrearGasto from "../gastos/CrearGasto"
import { usePagos } from "../pagos/ContextPago"
import { useGastos } from "../gastos/ContextGasto"

export default function Proyecto({ proyecto }) {
    const [addPago, setaddPago] = useState(false)
    const [addGasto, setaddGasto] = useState(false)
    const { pagos, setPagos } = usePagos()
    const { gastos, setGastos } = useGastos()

    const [activeTab, setActivetab] = useState(0)

    const [tpagos, setTpagos] = useState(0)
    const [tgastos, setTgastos] = useState(0)

    useEffect(() => {
        if (proyecto) {
            setPagos(proyecto.pagos)
            setGastos(proyecto.gastos)
        }
    }, [proyecto])

    useEffect(() => {
        setTpagos(pagos.reduce((ttl, pg) => ttl += pg.importe, 0))
    }, [pagos])

    useEffect(() => {
        setTgastos(gastos.reduce((ttl, gs) => ttl += gs.importe, 0))
    }, [gastos])
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
                                <p className="basis-1/2">Presupuesto:</p>
                                <div className="basis-1/2 text-right">${proyecto.presupuesto}</div>
                            </div>
                            <div className="flex">
                                <div className="basis-3/4">
                                    pagos: ({proyecto.pagos.length}):
                                </div>
                                <div className="basis-1/4 text-right">
                                    ${tpagos}
                                </div>

                            </div>
                            <div className="flex">
                                <div className="basis-3/4">
                                    Saldo:
                                </div>
                                <div className="basis-1/4 text-right border-t border-gray-600">
                                    ${proyecto.presupuesto - tpagos}
                                </div>
                            </div>
                            <div className="flex">
                                <div className="basis-3/4">
                                    Gastos:
                                </div>
                                <div className="basis-1/4 text-right">
                                    ${tgastos}
                                </div>
                            </div>
                            <div className="flex">
                                <div className="basis-3/4">
                                    Utilidad:
                                </div>
                                <div className="basis-1/4 text-right">
                                    ${proyecto.presupuesto - tgastos}
                                </div>
                            </div>

                        </div>
                    }

                    {activeTab === 1 &&
                        <div className="flex flex-col gap-2">
                            {pagos.length > 0 ?
                                pagos.map(pago => (
                                    <div className="flex gap-2 w-full odd:bg-gray-600" key={pago._id}>
                                        <div className="basis-3/4" >{pago.fecha} </div>
                                        <div className="basis-1/4 text-right">{pago.importe}</div>
                                    </div>
                                ))
                                : null
                            }
                            <div className="flex w-full justify-end">
                                <div className="basis-1/4 border-t text-right">
                                    {tpagos}
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
                        <button className="boton" onClick={() => setaddGasto(true)}>agregar gasto</button>
                    }
                </section>




            </div>

            <div className="flex gap-4 relative">
                {addGasto ?
                    <CrearGasto proyecto={proyecto} setaddGasto={setaddGasto} />
                    : null
                }
            </div>


        </div>
    )
}
