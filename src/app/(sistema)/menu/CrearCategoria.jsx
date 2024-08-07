import { useState } from "react"
import ModalDialog from "@/components/ModalDialog"
import { useCategorias } from "./CategoriasContext"

export default function CrearCategoria({ database, open, close }) {
    const [categoria, setCategoria] = useState("")
    const {crearCategoria} = useCategorias()
    const [guardando, setGuardando] = useState(false)
    const handleGuardar = () =>{        
        if(categoria!==""){
            setGuardando(true)
            let data = categoria
            crearCategoria(database, data).then(res=>{
                close()
                setGuardando(false)
            }).catch(err=>console.log(err))
        }
    }

    const handleClose = () => {
        setCategoria("")
        setGuardando(false)
        close()
    }
    return (
        <ModalDialog open={open} close={close}>
            <div className="form">
                <h1 className="titulo">Nueva categoría</h1>
                {!guardando?
                <>
                    <input name="nombre" className="inputbasico" value={categoria} onChange={(e)=>setCategoria(e.target.value)} />
                    <div className="flex gap-2 justify-end">
                        <button type="button" className="botonrojo" onClick={handleClose}>Cancelar</button>
                        <button type="button" className="botonverde" onClick={handleGuardar}>Guardar</button>
                    </div>
                </>
                :
                <h1 className="titulo"> Guardando... </h1>
                }
            </div>
        </ModalDialog>
    )
}
