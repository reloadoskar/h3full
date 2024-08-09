import { useRef, useState, useEffect } from 'react'
import ModalDialog from '@/components/ModalDialog'
import { useStaff } from './StaffContext'
import { useAuth } from '@/components/AuthContext'
import MiembroForm from './MiembroForm'

export default function CrearStaff() {
    const { user } = useAuth()
    const { crearStaff } = useStaff()
    const [open, setOpen] = useState(false)
    
    
    const close = () => {
        setOpen(false)        
    }
    
    return (
        <div className='w-full'>
            <button type="button" className='boton w-full' onClick={() => setOpen(true)} >Crear staff</button>
            <ModalDialog open={open} close={close}>
                <div className='overflow-auto'>
                    <h1 className='titulo'>Alta de Staff</h1>
                    <MiembroForm user={user} action={crearStaff} close={close} />
                </div>
            </ModalDialog>
        </div>
    )
}
