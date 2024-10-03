'use client'
import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import CrearStaff from './CrearStaff'
import Staff from './Staff'
import { useStaff } from './StaffContext'
import { useAuth } from '@/components/AuthContext'
import { nombreDelDiaSegunFecha } from '@/utils/tools'
import EquipoDeHoy from './EquipoDeHoy'

export default function Page() {
  const { user } = useAuth()
  const hoy = nombreDelDiaSegunFecha(new Date())
  const [activeTab, setActivetab] = useState(1)
  const { staff, staffSelected, loadStaff, staffFounded, buscarStaff, } = useStaff()
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
          loadStaff(user.database)
        ])
        return res
      }
      loadAll()
    }
  }, [user])

  useEffect(() => {
    if (busqueda) {
      if (busqueda.length > 0) {
        buscarStaff(buscarPor, busqueda)
      }
    }
  }, [busqueda])

  return (
    <div className='pr-4 py-4 w-full flex flex-col '>
      {/* <h1 className='titulo'>Staff</h1> */}
      <div className='mx-auto'>
        <ul className='flex'>
          <li className={activeTab == 1 ? 'tabselected' : 'tab'} onClick={() => setActivetab(1)}>Staff</li>
          <li className={activeTab == 0 ? 'tabselected' : 'tab'} onClick={() => setActivetab(0)}>Hoy</li>
          <li className={activeTab == 2 ? 'tabselected' : 'tab'} onClick={() => setActivetab(2)}>Stats</li>
        </ul>
      </div>

      <section className='tabsection'>
        {activeTab === 0 &&
          <EquipoDeHoy staff={staff} />
        }
        {activeTab === 1 &&
          <div className='flex flex-col gap-2'>

            <div className='flex flex-col md:flex-row gap-2 items-stretch'>

              <div className='basis-1/2 w-full'>
                <CrearStaff />
              </div>

              <div className='basis-1/2 flex gap-2 inputbasico w-full'>
                <Search />
                <select name="buscarPor" className="dark:bg-gray-800 bg-transparent"
                  value={buscarPor}
                  onChange={(e) => setBuscarpor(e.target.value)}>
                  <option value="nombre">NOMBRE</option>
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

            </div>

            <Staff staff={!busqueda ? staff : staffFounded} user={user} />

          </div>
        }
        {activeTab === 2 &&
          <div>
            stats
          </div>
        }
      </section>
    </div>
  )
}
