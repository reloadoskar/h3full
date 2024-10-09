'use client'
import { useEffect } from "react";
import Navigation from "./Navigation";
import { useAuth } from "@/components/AuthContext";
import { useProyectos } from "./proyectos/ContextProyecto";
import { useSettings } from "./settings/settingsContext";
import { useUbicacions } from "./ubicaciones/UbicacionsContext";
import { useClientes } from "./clientes/ClientesContext";
import { usePagos } from "./pagos/ContextPago";

export default function HfullContenedor({ payload, children }) {
    const { user, setUser, setAutenticado } = useAuth()
    const { loadProyectos } = useProyectos()
    const { loadSettings } = useSettings()
    const {loadUbicacions} = useUbicacions()
    const {loadClientes} = useClientes()
    const {loadPagos} = usePagos()
    useEffect(() => {
        if (payload) {
            setUser(payload)
            setAutenticado(true)
        }
    }, [payload])

    useEffect(() => {
        if (user) {
            const loadAll = async () => {
                const res = await Promise.all([
                    loadSettings(user.database),
                    loadClientes(user.database),
                    loadProyectos(user.database),
                    loadUbicacions(user.database),
                    loadPagos(user.database)
                ])
                return res
            }
            loadAll()
        }
    }, [user])
    return (
        <div className="flex flex-col" >
            <Navigation payload={payload} />
            <div className="md:pl-12 md:pr-6 pl-2 pr-2">
                {children}
            </div>
        </div>
    )
}
