import { ChevronUp } from "lucide-react";
import Reserva from "./Reserva";
import { useReservas } from "./ReservasContext";

export default function Reservas({ reservas }) {
  const {ordenarPorNombre} = useReservas()
  return !reservas ? <h1>No hay datos</h1> :
    <div className='overflow-auto w-full mt-6'>
      <table className='bg-gray-300 w-full dark:bg-gray-800 rounded-md overflow-x-auto table-auto'>
        <thead className='' >
          <tr >
            <th className='px-4 '>
              <div className="flex gap-2">
                Nombre
                <button className="text-gray-400 hover:text-gray-100" onClick={ordenarPorNombre}>
                  <ChevronUp />
                </button>

              </div>
            </th>
            <th className='text-left flex gap-2'>
              Fecha
              <ChevronUp />
            </th>
            <th className='text-right'>Horario</th>
            <th className='text-right'>Personas</th>
            <th className='px-4 text-left'>Status</th>
          </tr>
        </thead>
        <tbody className='px-4'>
          {reservas.map(reserva => (
            <Reserva key={reserva._id} reserva={reserva} />
          ))}
        </tbody>
      </table>
    </div>

}
