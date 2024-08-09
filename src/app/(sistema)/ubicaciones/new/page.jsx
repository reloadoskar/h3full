'use client'
import axios from "axios";
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function NuevaUbicacion() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newUbicacion, setNewUbicacion] = useState({
        nombre: "",
        tipo: "",
        direccion: "",
        telefono: "" 
    })
    useEffect(() => {
        if (session) {
            setNewUbicacion({ ...newUbicacion, database: session.user.database })
        }
    }, [session])
    const handleChange = (e) => {
        if(e.target.name==="nombre" || e.target.name==="direccion" ){
            let uppercased = e.target.value.toUpperCase()
            return setNewUbicacion({ ...newUbicacion, [e.target.name]: uppercased });
        }else{}
        setNewUbicacion({ ...newUbicacion, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        console.log("Enviando...")
        await createUbicacion()
    }
    const createUbicacion = async () => {
        try {
            const res = await axios.post("/api/ubicacion/", newUbicacion)
            console.log("Guardado 👍")
            router.push("/catalogos/ubicaciones");
            router.refresh();

        } catch (error) {
            setIsSubmitting(false)
            console.error(error.message)
        }
    }
    return (
        <section className="sectionbasic">
            <form onSubmit={handleSubmit} className="form">
            <h1 className="titulo">+Nueva Ubicación</h1>
                {isSubmitting ? <h2 className="text-bold text-2xl text-center">Enviando...</h2> :
                    <>
                        <input
                            name="nombre"
                            type="text"
                            placeholder="BODEGA 1"
                            className="inputbasico"
                            value={newUbicacion.nombre}
                            onChange={handleChange}
                            required
                        />
                        <select name="tipo"
                            placeholder="Tipo"
                            className="inputbasico"
                            value={newUbicacion.tipo}
                            onChange={handleChange}
                            required
                        >
                            <option>BODEGA</option>
                            <option>SUCURSAL</option>
                            <option>ON-LINE</option>
                        </select>
                        <input name="direccion"
                            type="text"
                            placeholder="AV SIEMPRE VIVA 123"
                            className="inputbasico"
                            value={newUbicacion.direccion}
                            onChange={handleChange}
                        />
                        <input name="telefono"
                            type="text"
                            placeholder="55 9655 9988"
                            className="inputbasico"
                            value={newUbicacion.telefono}
                            onChange={handleChange}
                        />

                        <button className="botonform" >Guardar</button>

                    </>
                }
            </form>
        </section>
    )
}
