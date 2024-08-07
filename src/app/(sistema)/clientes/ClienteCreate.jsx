import { useEffect, useState } from 'react'
import Modal from '@/components/Modal';
import { useClientes } from './ClientesContext';
import { useUbicacions } from '../ubicaciones/UbicacionsContext';
import { useAuth } from '@/components/AuthContext';

const clnt = {
    nombre: "",
    email: "",
    tel1: "",
}
export default function ClienteCreate({ db, open, close }) {
    const { user, autenticado } = useAuth()
    const { createCliente } = useClientes()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newCliente, setNewCliente] = useState(clnt)
    const {ubicacions} = useUbicacions()
    useEffect(() => {
        if (user) {
            setNewCliente({ ...newCliente, database: user.database })
        }
    }, [user])
    const handleChange = (e) => {
        if (e.target.name === "nombre" || e.target.name === "ref") {
            let uppercased = e.target.value.toUpperCase()
            return setNewCliente({ ...newCliente, [e.target.name]: uppercased });
        }
        setNewCliente({ ...newCliente, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        // toast("Enviando...")
        await createCliente(db, newCliente).then(res => {
            setIsSubmitting(false)
            setNewCliente(clnt)
            close()
        }).catch((err) => {
            console.error("Algo salió mal: "+err)
            setIsSubmitting(false)
        })
    }

    return (
        <Modal isOpen={open} onClose={close}>
            {isSubmitting ? <h2 className="text-bold text-2xl text-center">...Enviando...</h2> :
                <form onSubmit={handleSubmit} className="form flex flex-col">
                    <h1 className="titulo border-b ">Nuevo cliente</h1>
                    <input
                        name="nombre"
                        type="text"
                        placeholder="Nombre*"
                        className="inputbasico"
                        value={newCliente.nombre}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="ref"
                        type="text"
                        placeholder="Referencia"
                        className="inputbasico"
                        value={newCliente.ref}
                        onChange={handleChange}
                    />
                    <select 
                        name="ubicacion"
                        className='inputbasico'
                        value={newCliente.ubicacion}
                        onChange={handleChange}
                        required>
                        {ubicacions.map(ub=>(
                            <option key={ub._id} value={ub._id}> {ub.nombre} </option>
                        ))}
                    </select>
                    <input name="email"
                        type="email"
                        placeholder="email@cliente.com"
                        className="inputbasico"
                        value={newCliente.email}
                        onChange={handleChange}
                        
                    />
                    <input name="tel1"
                        type="text"
                        placeholder="55 5555-5555"
                        className="inputbasico"
                        value={newCliente.tel1}
                        onChange={handleChange}
                        
                    />

                    <button className="botonverde" >Guardar</button>
                    <button className="botonrojo" onClick={close}>Salir</button>

                </form>
            }
        </Modal>
    )
}
