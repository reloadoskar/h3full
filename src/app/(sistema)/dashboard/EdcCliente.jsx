import { useState } from 'react'
import { numeroFormateado } from "@/utils/tools";

export default function EdcCliente({ edc }) {
    const [mostrarPagos, setMostrarPagos] = useState(false)
    return edc.presupuesto > 0 ?
        <div className="flex flex-col odd:bg-gray-600 px-4">
            <div key={edc.cliente._id} className="flex gap-2 cursor-pointer" onClick={() => setMostrarPagos(!mostrarPagos)}>
                <div className="basis-8/12 text-nowrap ">{edc.cliente.nombre}</div>
                <div className="basis-1/12 text-right">{numeroFormateado(edc.presupuesto)}</div>
                <div className="basis-1/12 text-right">{numeroFormateado(edc.totalPagos)}</div>
                <div className="basis-1/12 text-right">{numeroFormateado(edc.saldo)}</div>
            </div>
            {mostrarPagos ?
                <div className="bg-gray-800 rounded-md mb-2">
                    <h2 className="subtitulo text-center">Pagos:</h2>
                    {edc.pagos.map(pago => (
                        <div key={pago._id} className="flex gap-2 px-2 even:bg-gray-500">
                            <div className="basis-1/3">{pago.fecha}</div>
                            <div className="basis-1/3">{pago.tipo}</div>
                            <div className="basis-1/3 text-right">{numeroFormateado(pago.importe)}</div>
                        </div>
                    ))}
                    <div className="flex gap-2 px-2 bg-gray-700">
                        <div className="basis-2/3 text-right">Total:</div>
                        <div className="basis-1/3 text-right">{ numeroFormateado(edc.totalPagos)}</div>
                    </div>
                </div>
                : null}

        </div>
        : null
}
