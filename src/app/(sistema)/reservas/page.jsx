'use client'
import React, { useState, useEffect } from 'react'
import Switch from '@/components/Switch'
import { Search, X } from 'lucide-react'
import CrearReserva from './CrearReserva'
import Reservas from './Reservas'
import { useReservas } from './ReservasContext'
import { useAuth } from '@/components/AuthContext'
import EditarReserva from './EditarReserva'

export default function Page() {
  const { user } = useAuth()
  const { reservas, reservaSelected, loadReservas, reservasFounded, buscarReserva, } = useReservas()
  const [verTerminadas, setVerterminadas] = useState(false)
  const [busqueda, setBusqueda] = useState("")
  const [buscarPor, setBuscarpor] = useState("nombre")
  const handleVerTerminadas = () => {
    return setVerterminadas(prevVer => prevVer === false ? true : false)
  }
  useEffect(() => {
    if (user) {
      const loadAll = async () => {
        const res = await Promise.all([
          loadReservas(user.database)
        ])
        return res
      }
      loadAll()
    }
  }, [user])

  useEffect(() => {
    if (busqueda) {
      if (busqueda.length > 0) {
        buscarReserva(buscarPor, busqueda)
      }
    }
  }, [busqueda])
  return (
    <div className='pr-4 py-4 w-full flex flex-col gap-4'>
      <h1 className='titulo'>Reservas</h1>
      <div className='items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        
        <div className='flex gap-2 inputbasico w-full'>
          <Search />
          <select name="buscarPor" className="dark:bg-gray-800 bg-transparent"
            value={buscarPor}
            onChange={(e) => setBuscarpor(e.target.value)}>
            <option value="nombre">NOMBRE</option>
            <option value="fecha">FECHA</option>
            <option value="horario">HORARIO</option>
          </select>
          <input name="busqueda"
            type="text"
            className='bg-transparent focus:border-none focus:outline-none w-full '
            placeholder='Buscar...'
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          {busqueda === "" ? null :
            <button className='text-gray-900 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-100' onClick={() => setBusqueda("")}>
              <X />
            </button>
          }
        </div>
        
        <CrearReserva />
        
        <EditarReserva reserva={reservaSelected} database={user?.database} />
        
        <div className='flex gap-2 p-4 w-full justify-center'>
          <p>Ver Terminadas</p>
          <Switch label="verterminadas" value={verTerminadas} action={handleVerTerminadas} />
        </div>

        <div>
          <input name="fecha" className='inputbasico' type="date" onChange={(e)=>{
            setBuscarpor("fecha")
            setBusqueda(e.target.value)
          }} />
        </div>

      </div>

      <Reservas reservas={!busqueda ? reservas : reservasFounded} />

    </div>
  )
}
