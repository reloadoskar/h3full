'use client'
import { Search, X } from 'lucide-react'
import CrearPedido from './CrearPedido'
import Switch from '@/components/Switch'
import EditarPedido from './EditarPedido'
import Pedidos from './Pedidos'
import { useState } from 'react'
import { usePedidos } from './PedidosContext'
import { useAuth } from '@/components/AuthContext'

export default function Page() {
  const { user } = useAuth()
  const { pedidos, pedidoSelected } = usePedidos()
  const [buscarPor, setBuscarpor] = useState("nombre")
  const [busqueda, setBusqueda] = useState("")
  const [activeTab, setActivetab] = useState(1)
  return (
    <div className='pr-4 py-4 w-full flex flex-col'>
      {/* <h1 className='titulo'>Pedidos/Ordenes</h1> */}
      <div className='mx-auto'>
        <ul className='flex'>
          <li className={activeTab == 1 ? 'tabselected' : 'tab'} onClick={() => setActivetab(1)}>Ordenes</li>
          <li className={activeTab == 2 ? 'tabselected' : 'tab'} onClick={() => setActivetab(2)}>Nueva Orden</li>
        </ul>
      </div>

      <section className='tabsection'>
        {activeTab === 1 &&
          <div>
            <div className='basis-1/3 flex gap-2 inputbasico w-full'>
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
            <Pedidos pedidos={!busqueda ? pedidos : pedidosFounded} />
          </div>
        }
        {activeTab === 2 &&
          <div>
            <div className='flex flex-col md:flex-row gap-2 items-stretch'>

              

              <div className='w-full'>
                <CrearPedido />
              </div>

              {/* <EditarPedido pedido={pedidoSelected} database={user?.database} />
              
              <div>
                <input name="fecha" className='inputbasico' type="date" onChange={(e)=>{
                  setBuscarpor("fecha")
                  setBusqueda(e.target.value)
                }} />
              </div> */}

            </div>
          </div>
        }

      </section>
    </div>
  )
}
