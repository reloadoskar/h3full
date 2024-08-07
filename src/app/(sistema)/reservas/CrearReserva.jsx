import React, { useRef, useState, useEffect } from 'react'
import ModalDialog from '@/components/ModalDialog'
import { useReservas } from './ReservasContext'
import { useAuth } from '@/components/auth/AuthContext'

export default function CrearReserva() {
  const { user } = useAuth()
  const { crearReserva } = useReservas()
  const [open, setOpen] = useState(false)
  const [newReserva, setNewreserva] = useState({
    nombre: "",
    fecha: "",
  })
  const ref = useRef(null)
  const close = () => {
    setNewreserva({ nombre: "", fecha: "", horario: "", personas: 0 })
    return setOpen(false)
  }
  useEffect(() => {
    const handleOutsideClick = (e) => {
      // console.log(ref.current)
      // console.log(e.target)
      if (!ref.current.contains(e.target)) {
        close()
      }
    }
    window.addEventListener("mousedown", handleOutsideClick)

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [ref])

  const handleSubmit = (e) => {
    e.preventDefault()
    crearReserva(user.database, newReserva).then(() => {
      close()
    }).catch(e => console.log(e))
  }
  return (
    <>
      <button type="button" className='boton' onClick={() => setOpen(true)} >Crear reserva</button>
      <ModalDialog open={open} close={close}>
        <div className='overflow-auto'>
          <form ref={ref} className='form mt-6 ' onSubmit={handleSubmit}>

            <h1 className='titulo'>Nueva reserva</h1>

            <label htmlFor='fecha' className='label'>Fecha</label>
            <input name="status" value="PENDIENTE" type="hidden" />
            <input id="fecha"
              name="fecha"
              required
              className='inputbasico'
              type="date"
              value={newReserva.fecha}
              onChange={(e) => setNewreserva({ ...newReserva, fecha: e.target.value })}
            />

            <label htmlFor='nombre' className='label'>Nombre</label>
            <input id="nombre"
              name="nombre"
              required
              className='inputbasico'
              type="text"
              value={newReserva.nombre}
              onChange={(e) => setNewreserva({ ...newReserva, nombre: e.target.value })}
            />

            <label htmlFor='horario' className='label'>Horario</label>
            <input id="horario"
              name="horario"
              required
              className='inputbasico'
              type="time"
              value={newReserva.horario}
              onChange={(e) => setNewreserva({ ...newReserva, horario: e.target.value })}
            />

            <label htmlFor="personas" className="label">Personas</label>
            <input id="personas"
              name='personas'
              required
              className='inputbasico'
              type="number"
              value={newReserva.personas}
              onChange={(e) => setNewreserva({ ...newReserva, personas: e.target.value })}
            />

            <label htmlFor='ocacion' className='label'>Ocación</label>
            <input id="ocacion"
              name="ocacion"
              className='inputbasico'
              type="text"
              value={newReserva.ocacion}
              onChange={(e) => setNewreserva({ ...newReserva, ocacion: e.target.value })}
            />

            <div className='flex gap-2'>
              <button type="button" className='botonrojo w-full' onClick={close}>cancelar</button>
              <button type="submit" className='boton w-full'>Guardar</button>
            </div>

          </form>
        </div>
      </ModalDialog>
    </>
  )
}
