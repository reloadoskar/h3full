import { useState, useEffect } from 'react'
import { useCategorias } from './CategoriasContext'
import { useMenu } from './MenuContext'
import { Search, X } from 'lucide-react'

export default function Buscador() {
  const { categorias } = useCategorias()
  const { busqueda, setBusqueda, buscarPor, buscarPlato } = useMenu()
  
  useEffect(() => {
    if (busqueda) {
      if (busqueda.length > 0) {
        buscarPlato(buscarPor, busqueda)
      }
    }
  }, [busqueda])
  return (
    <div className='inputbasico flex gap-2'>
      <Search />
      {/* <select name="categoria" className="dark:bg-gray-800 bg-transparent focus:outline-none">
        {categorias.length > 0 ?
          categorias.map(categoria => (
            <option key={categoria._id} value={categoria.nombre}>{categoria.nombre}</option>
          ))
          : null}
      </select> */}
      <input name="busqueda"
        type="text"
        className="w-full bg-transparent focus:border-none focus:outline-none"
        placeholder='buscar...'
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)} />
      {busqueda === "" ? null :
        <button className='text-gray-900 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-100'
          onClick={() => setBusqueda("")}>
          <X />
        </button>
      }
    </div>
  )
}
