'use client'
import React, { useEffect, useState } from 'react'
import { useSettings } from './settingsContext'

export default function Settings() {
  
  const { settings, setSettings, createSettings, updateSettings } = useSettings()
  const [plansel, setPlansel] = useState(null)
  const [precsel, setPrecsel] = useState(null)
  useEffect(() => {
    const plans = [
      { id: "BASIC", name: "BÁSICO", sucursales: 1, usuarios: 1, precioa: 899, preciob: 2499, precioc: 4499, preciod: 8499 },
      { id: "PRO", name: "PROFESIONAL", sucursales: 5, usuarios: 10, precioa: 4499, preciob: 12799, precioc: 17799, preciod: 32499 },
      { id: "ADVANCED", name: "AVANZADO", sucursales: 10, usuarios: 30, precioa: 8999, preciob: 9899, precioc: 17799, preciod: 32499 }
    ]
    if (settings) {
      let filtro = plans.filter(plan => plan.id === settings.plan)
      return setPlansel(filtro[0])
    }
    setPlansel(null)
  }, [settings])

  const handleChange = (e) => setSettings({ ...settings, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault()
    createSettings(database, settings).then(res => {
      console.log("Actualizado correctamente")
      // console.log(res)
    }).catch((err) => {
      console.error("Algo salió mal: " + err)
    })
  }

  return !settings ? null :
    <div className='p-6 w-full flex flex-col gap-4'>
      <form onSubmit={handleSubmit} className='form'>
        <h1 className='text-lg uppercase font-bold'>Configuración</h1>
        <div>
          <label htmlFor='tipo'>Tipo de App</label>
          <select id="tipo" name="tipo" className='inputbasico' value={settings.tipo} onChange={handleChange}>
            <option></option>
            <option>COMPRA VENTA</option>
            <option>RESTAURANTE</option>
          </select>
        </div>
        <div>
          <label htmlFor='nombre'>Nombre del establecimiento</label>
          <input id="nombre" name="nombre" className='inputbasico' value={settings.nombre} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="direccion">Dirección</label>
          <input id="direccion" name="direccion" className='inputbasico' value={settings.direccion} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="tel">Teléfono</label>
          <input id="tel" name="telefono" className='inputbasico' value={settings.telefono} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor='email'>email</label>
          <input id="email" name="email" className="inputbasico" value={settings.email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="plan">Plan</label>
          <select id="plan" name="plan" className='inputbasico' value={settings.plan} onChange={handleChange}>
            <option value={null}></option>
            <option value="BASIC">BÁSICO</option>
            <option value="PRO">PRO</option>
            <option value="ADVANCED">AVANZADO</option>
          </select>
          <div>
            {
              plansel === null ? null :
                <div>
                  Plan: {plansel.name}
                  <select id="periodo" name="periodo" className='inputbasico' value={settings.periodo} onChange={handleChange}>
                    <option value="MENS">Mensual: ${plansel.precioa}</option>
                    <option value="TRIM">Trimestral: ${plansel.preciob}</option>
                    <option value="SEME">Semestral: ${plansel.precioc}</option>
                    <option value="ANUA">Anual: ${plansel.preciod}</option>
                  </select>
                  sucursales: {plansel.sucursales}
                  usuarios: {plansel.usuarios}
                </div>
            }
          </div>
          <div>
            <button type="submit" className='boton'>Guardar</button>
          </div>
        </div>
      </form>
    </div>
  
}
