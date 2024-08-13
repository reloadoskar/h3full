'use client'
import { useEffect, useState } from "react";
import { useClientes } from "./ClientesContext";
import ClienteCreate from "./ClienteCreate";
import ClienteEditable from "./ClienteEditable";
import { useUbicacions } from "../ubicaciones/UbicacionsContext";
import ClientesList from "./ClientesList";
import { useAuth } from "@/components/AuthContext";

export default function Clientes() {
  const { user, autenticado } = useAuth()
  const [database, setDb] = useState(null)
  const { busqueda , cliente, loadClientes, verCliente, buscarCliente } = useClientes()
  const { loadUbicacions } = useUbicacions()
  const [dialogCrear, setDialogCrear] = useState(false)

  useEffect(() => {
    if (user) {
      return setDb(user.database)
    }
    return setDb(null)
  }, [user])

  useEffect(() => {
    // if (database) {
      loadClientes(database)
        .catch(err => {
          console.error(err.data.message)
        })
      loadUbicacions(database).catch(err => 
        console.error("ocurrió un error")
      )
    // }
  }, [database])



  return (
    // <div className="mx-2 px-4 md:mx-4 w-full">
    <div className="mx-6">

      <header className="flex flex-col md:flex-row justify-between p-4 mt-5 items-center gap-2">
        <div className="basis-1/6">
          <span>
            <h2 className="titulo">
              {busqueda.length} Clientes
            </h2>
          </span>
        </div>
        <input className="inputbasico basis-1/3" name="busqueda" type="text" placeholder="buscar..." onChange={(e)=>buscarCliente(e.target.value.toUpperCase())}/>
        <button className="boton w-full basis-1/3" onClick={() => setDialogCrear(true)} >Crear Cliente</button>
        <ClienteCreate open={dialogCrear} close={() => setDialogCrear(false)} db={database} />
      </header>

      {busqueda.length <= 0 ? 
        <h2 className="text-bold text-xl text-center">No se encontraron clientes</h2> 
        : 

        <ClientesList clientes={busqueda} />  
      }

      <ClienteEditable cliente={cliente} open={verCliente} database={database} />
    </div>
  )
}

