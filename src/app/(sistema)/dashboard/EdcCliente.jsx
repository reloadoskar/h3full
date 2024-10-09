import { useState } from 'react'
import { numeroFormateado } from "@/utils/tools";

export default function EdcCliente({ edc }) {
    const [mostrarPagos, setMostrarPagos] = useState(false)
    return edc.presupuesto > 0 ?
        <div className="flex flex-col odd:bg-gray-600 px-4">
            <div key={edc.cliente._id} className="flex gap-2 cursor-pointer" onClick={() => setMostrarPagos(!mostrarPagos)}>
                <div className="basis-1/4">{edc.cliente.nombre}</div>
                <div className="basis-1/4 text-right">{numeroFormateado(edc.presupuesto)}</div>
                <div className="basis-1/4 text-right">{numeroFormateado(edc.totalPagos)}</div>
                <div className="basis-1/4 text-right">{numeroFormateado(edc.presupuesto - edc.totalPagos)}</div>
            </div>
            {mostrarPagos ?
                <div className="bg-gray-950 rounded-md mb-2">
                    <h2 className="subtitulo text-center">Pagos:</h2>
                    {edc.pagos.map(pago => (
                        <div key={pago._id} className="flex gap-2 px-2 even:bg-gray-500">
                            <div className="basis-1/3">{pago.fecha}</div>
                            <div className="basis-1/3">{pago.tipo}</div>
                            <div className="basis-1/3 text-right">{pago.importe}</div>
                        </div>
                    ))}
                </div>
                : null}

        </div>
        : null
}
