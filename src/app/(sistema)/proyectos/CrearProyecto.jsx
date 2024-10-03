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
    presupuesto: 0,
    fechae: ""
}

export default function CrearProyecto({ estilo }) {
    const { user } = useAuth()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { clientes, loadClientes } = useClientes()
    const { crearProyecto } = useProyectos()
    const [newProyecto, setNewproyecto] = useState(pbase)

    useEffect(() => {
        if (user) {
            loadClientes(user.database)
        }
    }, [user])

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }
    const handleCloseModal = () => {
        setIsModalOpen(false);
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        crearProyecto(user.database, newProyecto).then(() => {
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

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} >
                <div className="px-4">
                    <h2 className="titulo">Nuevo Proyecto</h2>
                    <form className="flex flex-col gap-2 overflow-auto" onSubmit={handleSubmit}>
                        <label>Selecciona cliente</label>
                        <select name="cliente"
                            className="inputbasico"
                            required
                            value={newProyecto.cliente}
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
                            value={newProyecto.nombre}
                            onChange={(e) => setNewproyecto({ ...newProyecto, nombre: e.target.value })}
                        />
                        <label>Descripción</label>
                        <textarea name="descripcion"
                            rows={4}
                            className="inputbasico"
                            required
                            value={newProyecto.descripcion}
                            onChange={(e) => setNewproyecto({ ...newProyecto, descripcion: e.target.value })}
                        />
                        <label htmlFor="presupuesto">Presupuesto</label>
                        <input id="presupuesto"
                            name="presupuesto"
                            type="number"
                            className="inputbasico"
                            required
                            value={newProyecto.presupuesto}
                            onChange={(e) => setNewproyecto({ ...newProyecto, presupuesto: e.target.value })}
                        />
                        <label htmlFor="fechae">Fecha de entrega estimada</label>
                        <input id="fechae"
                            className="inputbasico"
                            type="date"
                            value={newProyecto.fechae}
                            required
                            onChange={(e) => setNewproyecto({ ...newProyecto, fechae: e.target.value })}
                        />
                        <div className="flex gap-4 justify-end">
                            <button type="button" className="botonrojo" onClick={handleCloseModal}>Cancelar</button>
                            <button type="submit" className="botonverde">Crear Proyecto</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}
