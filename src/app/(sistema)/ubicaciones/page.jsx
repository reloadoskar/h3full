
'use client'
import { useSession } from "next-auth/react";
import UbicacionRow from "./UbicacionRow";
import Link from "next/link";
import { useState, useEffect } from "react";

import { useUbicacions } from "./UbicacionsContext";

//   const ubicacions = [
//     {tipo: "BODEGA",nombre:"BODEGA", direccion:"Av. Siempre viva 123", telefono:"5512345678", email:"bodega@mail.com", capacidad:1200, empaquesCapacidad:"CAJAS", empleados:[]},
//     {tipo: "SUCURSAL",nombre:"LAPRINCIPAL", direccion:"Av. 45  654, Numeros, CDMX", telefono:"5512345678", email:"bodega@mail.com", capacidad:500, empaquesCapacidad:"CAJAS", empleados:[]},
//     {tipo: "SUCURSAL",nombre:"LASEGUNDA", direccion:"Romanos. 45 , Patos, CDMX", telefono:"5512345678", email:"bodega@mail.com", capacidad:150, empaquesCapacidad:"CAJAS", empleados:[]},
//     {tipo: "BANCO",nombre:"BANPOPO", direccion:"Sanitario 1, Miercoles, CDMX", telefono:"5512345678", email:"bodega@mail.com", capacidad:200, empaquesCapacidad:"CAJAS", empleados:[] },
// ]
export default function Ubicacions() {
  const [database, setDb] = useState(null)
  const {ubicacions, loadUbicacions, ubicacion} = useUbicacions()
  const { data: session, status } = useSession()

  useEffect(() => {
    // console.log(status)
    if(status === 'authenticated'){
      loadUbicacions(session.user.database).then(res=>{
        console.log(res.data.message)
        setDb(session.user.database)
      }).catch(err=>{
        console.error(err)
      })
    }
    return setDb(null)
  }, [session, status, loadUbicacions])

  return (
    <div className="p-6 w-full flex flex-col gap-4">
      <header className="flex flex-col md:flex-row justify-between p-4 mt-5 items-center gap-2">
        <div className="md:basis-1/6">
          <span>
            <h2 className="titulo">
              {ubicacions.length}
            </h2>
          </span>
          <p className="text-center">Ubicaciones</p>
        </div>
        <input className="inputbasico md:basis-1/3" name="busqueda" type="text" placeholder="buscar..." />
        <Link className="botonborde w-full text-center md:basis-1/3" href="/catalogos/ubicaciones/new" >+Crear Ubicacion</Link>
      </header>

      <section className="flex flex-col gap-2">
        {ubicacions.length <= 0 ? <h2 className="grid p-4 text-bold text-xl mx-auto">No se encontraron ubicaciones</h2> : ubicacions.map(ubicacion => (
          <UbicacionRow data={ubicacion} key={ubicacion._id} database={database} />
        ))}
      </section>

    </div>
  )
}

