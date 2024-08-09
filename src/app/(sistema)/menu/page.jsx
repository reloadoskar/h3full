'use client'
import { useEffect, useState } from 'react'
import Platos from './Platos'
import CrearPlato from './CrearPlato'
import { useMenu } from './MenuContext'
import { useCategorias } from './CategoriasContext'
import { useSubcategorias } from './SubcategoriasContext'
import Buscador from './Buscador'
import { useAuth } from '@/components/AuthContext'
import EditarPlato from './EditarPlato'

export default function Menu() {
  const { user, autenticado } = useAuth()
  const { menu, loadMenu, platoSeleccionado, platosFounded, busqueda } = useMenu()
  const { loadCategorias } = useCategorias()
  const { loadSubcategorias } = useSubcategorias()

  useEffect(() => {
    if (user) {
      const loadAll = async () => {
        const res = await Promise.all([
          loadMenu(user.database),
          loadCategorias(user.database),
          loadSubcategorias(user.database)
        ])
        return res
      }
      loadAll()
    }
  }, [user])

  return (
    <div className='pr-4 py-4 w-full flex flex-col gap-4'>
      <h1 className='titulo'>Menú</h1>
      <CrearPlato database={user?.database} />
      <EditarPlato plato={platoSeleccionado} database={user?.database} />
      <Buscador />
      <Platos platos={!busqueda ? menu : platosFounded} />
    </div>
  )
}
