'use client'
import { useEffect } from "react";
import { useProyectos } from "./ContextProyecto";
import CrearProyecto from "./CrearProyecto";
import ListaProyectos from "./ListaProyectos";
import { useAuth } from "@/components/AuthContext";

export default function Proyectos() {
  const {user} = useAuth()
  const {proyectos, loadProyectos} = useProyectos()
  useEffect(()=>{
    if(user){
      loadProyectos(user.database)
    }
  },[user])
  return (
    <div>
        <CrearProyecto estilo="LINK" />
        <ListaProyectos proyectos={proyectos} />
    </div>
  )
}
