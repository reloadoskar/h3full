'use client'
import { useState, useEffect } from "react";
import { useProyectos } from "./ContextProyecto";
import { useClientes } from "../clientes/ClientesContext";
import Modal from "@/components/Modal";
import { useAuth } from "@/components/AuthContext";

const pbase = {
    cliente: "",
    fecha: "",
    nombre: "",
    descripcion: "",
    presupuesto: 0
}

export default function CrearProyecto({ estilo }) {
    const {user} = useAuth()
    const [database , setDatabase] = useState("")

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { clientes, loadClientes } = useClientes()
    const { crearProyecto } = useProyectos()

    const [newProyecto, setNewproyecto] = useState(pbase)

    useEffect(() => {
        if (user) {
            setDatabase(user.database)
        }
    }, [user])

    if (clientes.length === 0) {
        loadClientes(database)
    }
    const handleOpenModal = () => {
        setIsModalOpen(true);
    }
    const handleCloseModal = () => {
        setIsModalOpen(false);
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.set('database', database);
        formData.set('cliente', newProyecto.cliente);
        formData.set('nombre', newProyecto.nombre);
        formData.set('descripcion', newProyecto.descripcion);
        formData.set('presupuesto', newProyecto.presupuesto);

        crearProyecto(formData).then(res => {
            setNewproyecto(pbase)
            handleCloseModal()
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <div>
                {estilo !== "LINK" ?
                    <button className="boton" onClick={handleOpenModal}>Crear proyecto</button>
                    : <p className="link" onClick={handleOpenModal}>Crear proyecto</p>
                }
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2 className="titulo">Nuevo Proyecto</h2>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                    <label>Selecciona cliente</label>
                    <select name="cliente"
                        className="inputbasico"
                        required
                        onChange={(e) => setNewproyecto({ ...newProyecto, cliente: e.target.value })}
                    >
                        <option value="NUEVO CLIENTE">Nuevo Cliente</option>
                        {clientes.map(cliente => (
                            <option key={cliente._id} value={cliente.nombre}>{cliente.nombre}</option>
                        ))}
                    </select>
                    <label>Nombre del proyecto</label>
                    <input name="nombre"
                        className="inputbasico"
                        type="text"
                        required
                        onChange={(e) => setNewproyecto({ ...newProyecto, nombre: e.target.value })}
                    />
                    <label>Descripción</label>
                    <textarea name="descripcion"
                        rows={4}
                        className="inputbasico"
                        required
                        onChange={(e) => setNewproyecto({ ...newProyecto, descripcion: e.target.value })}
                    />
                    <label htmlFor="presupuesto">Presupuesto</label>
                    <input id="presupuesto"
                        name="presupuesto"
                        type="number"
                        className="inputbasico"
                        required
                        onChange={(e) => setNewproyecto({ ...newProyecto, presupuesto: e.target.value })}
                    />
                    <div className="flex gap-4 justify-end">
                        <button type="button" className="botonrojo" onClick={handleCloseModal}>Cancelar</button>
                        <button type="submit" className="botonverde">Crear Proyecto</button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
