'use client'

import TableroProyectos from "../proyectos/TableroProyectos"
import { useSettings } from "../settings/settingsContext"
import EquipoDeHoy from "../staff/EquipoDeHoy"
import { useStaff } from "../staff/StaffContext"
import EstadosDeCuenta from "./EstadosDeCuenta"

export default function SeccionSuperior() {
  const { settings } = useSettings()
  const { staff } = useStaff()
  return !settings ? null :
    <div className="pt-6 gap-2">
      {settings.secciones.find(sec => sec === "staff") ?
        <EquipoDeHoy staff={staff} />
        : null
      }
      {/* {settings.secciones.find(sec => sec === "proyectos") ?
        <TableroProyectos />
        : null
      } */}
      
      <EstadosDeCuenta />
    </div>
}
