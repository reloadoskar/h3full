import ModalDialog from '@/components/ModalDialog'
import { useAuth } from '@/components/auth/AuthContext'
import React, { useEffect, useRef, useState } from 'react'
import { useReservas } from './ReservasContext'

export default function EditarReserva({ reserva, database }) {
    const { user } = useAuth()
    const { selectReserva, editarReserva } = useReservas()
    const [reservaEditable, setReservaeditable] = useState(null)
    const ref = useRef(null)
    useEffect(() => {
    if (reserva) {
            return setReservaeditable(reserva)
        }
    }, [reserva])
    useEffect(() => {
        if (user) {
            setReservaeditable({database: user.database, ...reservaEditable})
            // console.log("no hay usuario")
        }
    }, [user])

    const handleSubmit = (e) => {
        e.preventDefault()
        const reservaEditada = {
            database: database,
            _id: reservaEditable._id,
            nombre: reservaEditable.nombre,
            fecha: reservaEditable.fecha,
            horario: reservaEditable.horario,
            personas: reservaEditable.personas,
            ocacion: reservaEditable.ocacion,
            comentario: reservaEditable.comentario,
            status: reservaEditable.status,
        }
        editarReserva(reservaEditada)
            .then(()=>{
                setReservaeditable(null)
                close()
            })
            .catch(err=>console.log(err))
    }

    const close = () => {
        selectReserva(null)
    }

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!ref.current.contains(e.target)) {
                close()
            }
        }
        window.addEventListener("mousedown", handleOutsideClick)

        return () => {
            window.removeEventListener("mousedown", handleOutsideClick)
        }
    }, [ref])

    return !reservaEditable ? null :
        <ModalDialog open={reserva} close={close}>
            <div className='overflow-auto w-full px-6'>
                <form ref={ref} className='form' onSubmit={handleSubmit}>
                    <h1 className='titulo pb-4'>
                        Editando reserva de: {reservaEditable.nombre}
                    </h1>

                    <input type="hidden" name="_id" value={reservaEditable._id} onChange={(e)=>setReservaeditable({...reservaEditable, [e.target.name]:e.target.value})}/>
                    <input type="hidden" name="database" value={database} onChange={(e)=>setReservaeditable({...reservaEditable, [e.target.name]:e.target.value})}/>

                    <label htmlFor='nombre' className='label'>Nombre</label>
                    <input id="nombre"
                        name="nombre"
                        type="text"
                        required
                        className='inputbasico'
                        value={reservaEditable.nombre}
                        onChange={(e) => setReservaeditable({ ...reservaEditable, [e.target.name]: e.target.value })}
                    />

                    <label htmlFor='fecha' className='label'>Fecha</label>
                    <input id="fecha"
                        name="fecha"
                        type='date'
                        required
                        className='inputbasico'
                        value={reservaEditable.fecha}
                        onChange={(e) => setReservaeditable({ ...reservaEditable, [e.target.name]: e.target.value })}
                    />

                    <label htmlFor='horario' className='label'>Horario</label>
                    <input id="horario"
                        name="horario"
                        type="time"
                        required
                        className='inputbasico'
                        value={reservaEditable.horario}
                        onChange={(e) => setReservaeditable({ ...reservaEditable, [e.target.name]: e.target.value })}
                    />

                    <label htmlFor="personas" className="label">Personas</label>
                    <input id="personas"
                        name='personas'
                        required
                        className='inputbasico'
                        type="number"
                        value={reservaEditable.personas}
                        onChange={(e) => setReservaeditable({ ...reservaEditable, [e.target.name]: e.target.value })}
                    />

                    <label htmlFor='ocacion' className='label'>Ocación</label>
                    <input id="ocacion"
                        name="ocacion"
                        className='inputbasico'
                        type="text"
                        value={reservaEditable.ocacion}
                        onChange={(e) => setReservaeditable({ ...reservaEditable, [e.target.name]: e.target.value })}
                    />

                    <label htmlFor='comentario' className='label'>Comentario</label>
                    <textarea id="comentario"
                        name="comentario"
                        rows={5}
                        className='inputbasico'
                        type="text"
                        value={reservaEditable.comentario}
                        onChange={(e) => setReservaeditable({ ...reservaEditable, [e.target.name]: e.target.value })}
                    />

                    <label htmlFor='status' className='label'>Status</label>
                    <select id="status" 
                        name="status"
                        className='inputbasico'
                        onChange={(e)=>setReservaeditable({...reservaEditable, [e.target.name]: e.target.value})}
                    >
                        <option>{reservaEditable.status}</option>
                        <option value="CONFIRMADA">CONFIRMADA</option>
                        <option value="CANCELADO">CANCELADO</option>
                        <option value="TERMINADA">TERMINADA</option>
                    </select>

                    <div className='flex gap-2'>
                        <button type="button" className='botonrojo w-full'
                            onClick={close}>cancelar</button>
                        <button type="submit" className='boton w-full'>Guardar</button>
                    </div>

                </form>
            </div>
        </ModalDialog>
}
