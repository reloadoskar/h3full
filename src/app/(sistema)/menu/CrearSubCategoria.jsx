import { useState } from "react"
import ModalDialog from "@/components/ModalDialog"
import { useSubcategorias } from "./SubcategoriasContext"

export default function CrearSubCategoria({ database, open, close }) {
    const [subcategoria, setSubcategoria] = useState("")
    const {crearSubcategoria} = useSubcategorias()
    const [guardando, setGuardando] = useState(false)
    const handleGuardar = () =>{        
        if(subcategoria!==""){
            setGuardando(true)
            let data = subcategoria
            crearSubcategoria(database, data).then(res=>{
                close()
                setGuardando(false)
            }).catch(err=>{
                setGuardando(false)
                console.log(err)
            })
        }
    }
    return (
        <ModalDialog open={open} close={close}>
            <div className="form">
                <h1 className="titulo">Nueva Sub categoría</h1>
                {!guardando?
                <>
                    <input name="nombre" className="inputbasico" value={subcategoria} onChange={(e)=>setSubcategoria(e.target.value)} />
                    <div className="flex gap-2 justify-end">
                        <button type="button" className="botonrojo" onClick={()=>close()}>Cancelar</button>
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
