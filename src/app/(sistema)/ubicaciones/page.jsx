
'use client'

import UbicacionRow from "./UbicacionRow";
import Link from "next/link";
import { useState, useEffect } from "react";

import { useUbicacions } from "./UbicacionsContext";
import { useAuth } from "@/components/AuthContext";

export default function Ubicacions() {
  const [database, setDb] = useState(null)
  const {ubicacions, loadUbicacions, ubicacion} = useUbicacions()
  const { user, autenticado } = useAuth()

  useEffect(() => {
    // console.log(status)
    if(autenticado){
      loadUbicacions(user.database).then(res=>{
        console.log(res.data.message)
        setDb(user.database)
      }).catch(err=>{
        console.error(err)
      })
    }
    return setDb(null)
  }, [autenticado])

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

