'use client'
import axios from "axios";
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function NuevoCliente() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newCliente, setNewCliente] = useState({
        nombre: "",
        email: "",
        tel1: "",
    })
    useEffect(() => {
        if (session) {
            setNewCliente({ ...newCliente, database: session.user.database })
        }
    }, [session])
    const handleChange = (e) => {
        if(e.target.name==="nombre" ){
            let uppercased = e.target.value.toUpperCase()
            return setNewCliente({ ...newCliente, [e.target.name]: uppercased });
        }else{}
        setNewCliente({ ...newCliente, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        toast("Enviando...")
        await createCliente()
    }
    const createCliente = async () => {
        try {
            const res = await axios.post("/api/cliente/", newCliente)
            console.success("Guardado 👍")
            router.push("/catalogos/clientes");
            router.refresh();

        } catch (error) {
            // setIsSubmitting(false)
            console.error(error.message)
        }
    }
    return (
        <section className="sectionbasic">
            <form onSubmit={handleSubmit} className="form">
            <h1 className="titulo">+Nuevo Cliente</h1>
                {isSubmitting ? <h2 className="text-bold text-2xl text-center">Enviando...</h2> :
                    <>
                        <input
                            name="nombre"
                            type="text"
                            placeholder="Cliente perron"
                            className="inputbasico"
                            value={newCliente.nombre}
                            onChange={handleChange}
                            required
                        />
                        <input name="email"
                            type="email"
                            placeholder="mail@cliente.com"
                            className="inputbasico"
                            value={newCliente.email}
                            onChange={handleChange}
                            required
                        />
                        <input name="tel1"
                            type="text"
                            placeholder="55 9696-4848"
                            className="inputbasico"
                            value={newCliente.tel1}
                            onChange={handleChange}
                            required
                        />

                        <button className="botonform" >Guardar</button>

                    </>
                }
            </form>
        </section>
    )
}
