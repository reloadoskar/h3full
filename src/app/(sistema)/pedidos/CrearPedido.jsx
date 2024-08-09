import { useState, useEffect } from 'react'
import { usePedidos } from './PedidosContext'
import { useAuth } from '@/components/AuthContext'
import { useMenu } from '../menu/MenuContext'

export default function CrearPedido() {
  const { user } = useAuth()
  const { menu } = useMenu()
  const now = new Date()
  const { crearPedido } = usePedidos()
  const [newPedido, setNewpedido] = useState({
    fecha: (now.getDate() < 10 ? "0" + now.getDate() : now.getDate()) + "/" + (now.getMonth() < 10 ? "0" + now.getMonth() : now.getMonth()) + "/" + now.getFullYear(),
    hora: (now.getHours() < 10 ? "0" + now.getHours() : now.getHours()) + ":" + (now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()) + ":" + (now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds()),
    cliente: "PG",
    mesa: "",
    items: [],
    total: 0,
    status: "PENDIENTE"
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    crearPedido(user.database, newPedido).then(() => {
    }).catch(e => console.log(e))
  }

  return (
    <div className='w-full'>
      <div className='overflow-auto p-2'>
        <form className=' mt-6' onSubmit={handleSubmit}>
          <div className='flex justify-center'>
            <p>{newPedido.fecha} - {newPedido.hora}</p>
          </div>
          <input name="status" value={newPedido.status} type="hidden" />
          <input name="fecha" required type="hidden" value={newPedido.fecha} />
          <div>
          <label>Mesa</label>
          <select name="mesa" className='inputbasico'>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          </div>
          <ul className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            {menu.length > 0 ? menu.map(itm => (
              <div key={itm._id} className=''>
                <div className='flex justify-center text-l text-nowrap truncate'>{itm.nombre}</div>
                <img src={itm.filepath} className='imagenrectangulo' />
              </div>
            ))
              : null}

          </ul>


          <div className='flex gap-2'>
            <button type="button" className='botonrojo w-full' onClick={close}>cancelar</button>
            <button type="submit" className='boton w-full'>Guardar</button>
          </div>

        </form>
      </div>

    </div>
  )
}
