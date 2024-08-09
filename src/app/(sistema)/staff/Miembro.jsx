'use client'
import { useState } from 'react'
import avatar from '@/images/avatarH5.png'
import MiembroForm from './MiembroForm'
import { useStaff } from './StaffContext'
import { X } from 'lucide-react'
import ConfirmDialog from '@/components/ConfirmDialog'

export default function Miembro({ membr, user }) {
    const { editarStaff, eliminarStaff } = useStaff()
    const [vista, setVista] = useState("basic")
    const [editMode, setEditmode] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const switchVista = () => {
        setVista(prev => prev === "basic" ? "pro" : "basic")
    }
    // const deletemembr = () => {
    //     eliminarStaff(user, membr).then()
    // }
    return !membr ? <h1 className='titulo'>No hay datos</h1> :
        vista === "basic" ?
            <div className="tarjeta1" onClick={switchVista}>
                <div className='flex gap-4 align-middle items-center'>
                    <img className='w-10 rounded-full object-cover aspect-square' src={membr.avatar || avatar} alt="user avatar" />
                    <div className='w-2/4 text-center'>{membr.nombre}</div>
                    <div>ACTIVO</div>
                </div>
            </div>
            :
            <div className="tarjeta1 flex flex-col md:flex-row gap-4" >
                <div>
                    <button onClick={() => setVista("basic")}>
                        <X />
                    </button>
                </div>
                {editMode ? null :
                    <div className=''>
                        <img className='mx-auto w-24 rounded-full object-cover aspect-square' src={membr.avatar || avatar} alt="user avatar" />
                    </div>
                }

                {!editMode ?
                    <div className='md:w-1/2 flex flex-col'>
                        <h2 className='titulo text-center md:text-left'>{membr.nombre}</h2>
                        <div className='subtitulo text-center md:text-left'>
                            {membr.puesto}
                        </div>
                        <div className='flex md:flex-col gap-4'>
                            <div className='w-full md:text-left'>{membr.email}</div>
                            <div className='w-full text-right md:text-left' >{membr.telefono}</div>
                        </div>
                        <div className='text-right md:text-left'>
                            {membr.sueldo} {membr.periodo}
                        </div>
                        <div className='mx-auto'>
                            <ul className='flex gap-2'>
                                <li className={membr.dias.filter(dia=>dia==="Lunes")[0] ? "cuadroencendido" : "cuadro"}>L</li>
                                <li className={membr.dias.filter(dia=>dia==="Martes")[0] ? "cuadroencendido" : "cuadro"}>M</li>
                                <li className={membr.dias.filter(dia=>dia==="Miércoles")[0] ? "cuadroencendido" : "cuadro"}>M</li>
                                <li className={membr.dias.filter(dia=>dia==="Jueves")[0] ? "cuadroencendido" : "cuadro"}>J</li>
                                <li className={membr.dias.filter(dia=>dia==="Viernes")[0] ? "cuadroencendido" : "cuadro"}>V</li>
                                <li className={membr.dias.filter(dia=>dia==="Sábado")[0] ? "cuadroencendido" : "cuadro"}>S</li>
                                <li className={membr.dias.filter(dia=>dia==="Domingo")[0] ? "cuadroencendido" : "cuadro"}>D</li>
                            </ul>
                        </div>
                    </div>
                    :
                    <div className='w-full flex felx-col'>
                        <MiembroForm user={user} action={editarStaff} close={() => setEditmode(false)} prevStaff={membr} />
                    </div>
                }

                {!editMode ?

                    <div className='m-auto'>
                        <ConfirmDialog user={user} open={confirm} close={() => setConfirm(false)} data={membr} action={eliminarStaff} />
                        <button className='botonrojo' onClick={() => setConfirm(true)}>eliminar</button>
                        <button className='boton' onClick={() => setEditmode(true)}>editar</button>
                    </div>
                    :
                    null
                }


            </div>
}
