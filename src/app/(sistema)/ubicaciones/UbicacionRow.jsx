'use client'
import { useState } from 'react'
import { Warehouse, Store, Landmark, Building, Monitor } from 'lucide-react'
import { useUbicacions } from './UbicacionsContext'
export default function UbicacionRow({ data, database }) {
  const { updateUbicacion } = useUbicacions()
  const [ubicacion, setUbicacion] = useState(data)
  const [editMode, editar] = useState(false)
  const [guardando, setGuardando] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setGuardando(true)
    updateUbicacion(database, ubicacion).then(res => {
      console.log("Actualizado correctamente")
      editar(false)
    }).catch(err => {
      console.error(err.message)
    })
  }
  return !ubicacion ? null :
    <div className='flex flex-col justify-between border-gray-700 border' >
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <div className='flex flex-col hover:bg-gray-600 cursor-pointer' onClick={() => editar(true)}>

          <div className="mx-auto py-4">
            {ubicacion.tipo === "BODEGA" ? <Warehouse size={32} /> : null}
            {ubicacion.tipo === "SUCURSAL" ? <Store size={32} /> : null}
            {ubicacion.tipo === "BANCO" ? <Landmark size={32} /> : null}
            {ubicacion.tipo === "ADMINISTRACION" ? <Building size={32} /> : null}
            {ubicacion.tipo === "TIENDA EN LINEA" ? <Monitor size={32} /> : null}
          </div>
          <div className='grid grid-cols-2 md:grid-cols-5 p-2 gap-2 md:items-center'  >

            <div className=''>
              {!editMode ?
                <div className='flex flex-col'>
                  <label className='text-xs font-bold'>Nombre:</label>
                  <span>{ubicacion.nombre}</span>
                </div>
                :
                <div>
                  <label htmlFor='nombre' className='text-xs font-bold'>Nombre:</label>
                  <input id="nombre"
                    name="nombre"
                    className='inputbasico my-0'
                    value={ubicacion.nombre}
                    onChange={(e) => setUbicacion({ ...ubicacion, nombre: e.target.value })} />
                </div>
              }
            </div>
            <div className=''>{
              !editMode ?
                <div className='flex flex-col'>
                  <label className='text-xs font-bold'>Tipo:</label>
                  <span>{ubicacion.tipo}</span>
                </div>
                :
                <div>
                  <label htmlFor='tipo' className='text-xs font-bold'>Tipo:</label>
                  <select id="tipo"
                    name="tipo"
                    value={ubicacion.tipo}
                    className='inputbasico my-0'
                    onChange={(e) => setUbicacion({ ...ubicacion, tipo: e.target.value })} >
                    <option>SUCURSAL</option>
                    <option>BODEGA</option>
                    <option>ADMINISTRACION</option>
                    <option>BANCO</option>
                    <option>TIENDA EN LINEA</option>
                  </select>
                </div>
            }
            </div>
            <div className=''>
              {!editMode ?
                <div className='flex flex-col'>
                  <label className='text-xs font-bold'>Dirección:</label>
                  <span>{ubicacion.direccion}</span>
                </div>
                :
                <div>
                  <label htmlFor='direccion' className='text-xs font-bold'>Dirección:</label>
                  <input id="direccion"
                    name="direccion"
                    className='inputbasico my-0'
                    type="text"
                    value={ubicacion.direccion}
                    onChange={(e) => setUbicacion({ ...ubicacion, direccion: e.target.value })} />
                </div>
              }
            </div>
            <div className=''>
              {!editMode ?
                <div className='flex flex-col'>
                  <label className='text-xs font-bold'>Teléfono:</label>
                  <span>{ubicacion.telefono}</span>
                </div>
                :
                <div>
                  <label htmlFor='telefono' className='text-xs font-bold'>Teléfono:</label>
                  <input id="telefono"
                    name="telefono"
                    className='inputbasico my-0'
                    type="text"
                    value={ubicacion.telefono}
                    onChange={(e) => setUbicacion({ ...ubicacion, telefono: e.target.value })} />
                </div>
              }
            </div>
            <div className=''>
              {!editMode ?
                <div className='flex flex-col'>
                  <label className='text-xs font-bold'>Correo electrónico:</label>
                  <span>{ubicacion.email}</span>
                </div>
                :
                <div>
                  <label htmlFor='email' className='text-xs font-bold'>eMail:</label>
                  <input id="email"
                    name="email"
                    className='inputbasico my-0'
                    type="text"
                    value={ubicacion.email}
                    onChange={(e) => setUbicacion({ ...ubicacion, email: e.target.value })} />
                </div>
              }
            </div>
            {!editMode ?
              <div className=''>
                <div className='flex flex-col'>
                  <label className='text-xs font-bold'>Capacidad:</label>
                  <span>{ubicacion.capacidad} {ubicacion.empaqueCapacidad}</span>
                </div>
              </div>
              :
              <>
                <div className=''>
                  <label className='text-xs font-bold'>Capacidad:</label>
                  <input
                    name="capacidad"
                    className='inputbasico my-0'
                    type="number"
                    value={ubicacion.capacidad}
                    onChange={(e) => setUbicacion({ ...ubicacion, capacidad: e.target.value })} />
                </div>
                <div  >
                  <label className='text-xs font-bold'>Empaque</label>
                  <select name="empaquesCapacidad"
                    className='inputbasico my-0'
                    value={ubicacion.empaqueCapacidad}
                    onChange={(e) => setUbicacion({ ...ubicacion, empaqueCapacidad: e.target.value })} >
                    <option></option>
                    <option>CAJAS</option>
                    <option>ARPILLAS</option>
                    <option>BOLSAS</option>
                    <option>TARIMAS</option>
                  </select>
                </div>
              </>
            }

            {!editMode ?
              <div className=''>
                <div className='flex flex-col'>
                  <label className='text-xs font-bold'>Número de Empleados:</label>
                  <span>{ubicacion.empleados?.length}</span>
                </div>
              </div>
              : null
            }
            
              {!editMode ?
                <div className='flex flex-col'>
                  <label className='text-xs font-bold'>Horario:</label>
                  <span>de {ubicacion.horai} a {ubicacion.horaf} </span>
                </div>
                :
                <>
                  <div className='flex flex-col'>
                    <label className='text-xs font-bold'>Desde:</label>
                    <input name="horai" className='inputbasico my-0' type="time" value={ubicacion.horai} onChange={(e) => setUbicacion({ ...ubicacion, horai: e.target.value })} />
                  </div>
                  <div className='flex flex-col'>
                    <label className='text-xs font-bold'>Hasta</label>
                    <input name="horaf" className='inputbasico my-0' type="time" value={ubicacion.horaf} onChange={(e) => setUbicacion({ ...ubicacion, horaf: e.target.value })} />
                  </div>
                </>
              }
            


          </div>
        </div>

        {
          !editMode ? null :
            <div className='flex mx-auto gap-2'>
              <button type="button" className='botonrojo' onClick={() => editar(false)}>cancelar</button>
              <button type="submit" className='botonverde'>Guardar</button>
            </div>
        }
      </form >
    </div >
}
