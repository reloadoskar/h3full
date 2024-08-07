import ModalDialog from "@/components/ModalDialog";
import { useMenu } from "./MenuContext";
import { useEffect, useState } from "react";
import { useCategorias } from "./CategoriasContext";
import { useSubcategorias } from "./SubcategoriasContext";

export default function EditarPlato({ plato, database }) {
    const { selectPlato, editarPlato, eliminarPlato } = useMenu()
    const { categorias, } = useCategorias()
    const { subcategorias } = useSubcategorias()
    const [platoEditable, setPlatoeditable] = useState(null)
    useEffect(() => {
        if (plato) {
            return setPlatoeditable(plato)
        }
    }, [plato])

    const handleSubmit = (e) =>{
        e.preventDefault()
        const platoEditado = {
            database: database,
            _id: platoEditable._id,
            nombre: platoEditable.nombre,
            categoria: platoEditable.categoria,
            subcategoria: platoEditable.subcategoria,
            descripcion: platoEditable.descripcion,
            precio: platoEditable.precio,
            filepath: platoEditable.filepath,
        }
        editarPlato(platoEditado).then(res=>{
            console.log(res.message)
            close()
        })
    }

    const close = () =>{
        selectPlato(null)
    }

    const handleDelete = () => {
        eliminarPlato(database, plato).then(()=>{
            selectPlato(null)
        })
    }

    return !platoEditable ? null :
        <ModalDialog open={plato} close={()=>selectPlato(null)}>
            <div className="overflow-auto">
                <form className="form" onSubmit={handleSubmit}>
                    <h1 className="titulo">
                        Editando: {platoEditable.nombre}
                    </h1>
                    <input type="hidden" name="_id" value={platoEditable._id} />
                    <input type="hidden" name="database" value={database} />
                    <label className='text-gray-900 dark:text-gray-400' htmlFor='nombre'>Nombre del plato</label>
                    <input id="nombre" name="nombre"
                        className='inputbasico mt-0'
                        required
                        value={platoEditable.nombre}
                        onChange={(e) => setPlatoeditable({ ...platoEditable, [e.target.name]: e.target.value })} />

                    <label className='text-gray-900 dark:text-gray-400' htmlFor='categoria'>Categoría</label>
                    <select id="categoria" name="categoria"
                        className='inputbasico mt-0'
                        value={platoEditable.categoria}
                        onChange={(e) => setPlatoeditable({ ...platoEditable, [e.target.name]: e.target.value })}  >
                        <option>{platoEditable.categoria}</option>
                        {categorias.length > 0 ?
                            categorias.map(categoria => (
                                <option key={categoria._id} value={categoria.nombre}>{categoria.nombre}</option>
                            ))
                            : null}
                    </select>

                    <label className='text-gray-900 dark:text-gray-400' htmlFor='subcategoria'>Sub Categoría</label>
                    <select id="subcategoria" name="subcategoria"
                        className='inputbasico mt-0'
                        value={platoEditable.subcategoria}
                        onChange={(e) => setPlatoeditable({ ...platoEditable, [e.target.name]: e.target.value })}  >
                        <option>{platoEditable.subcategoria}</option>
                        {subcategorias.length > 0 ?
                            subcategorias.map(subcategoria => (
                                <option key={subcategoria._id} value={subcategoria.nombre}>{subcategoria.nombre}</option>
                            ))
                            : null}
                    </select>

                    <label className='text-gray-900 dark:text-gray-400' htmlFor='descripcion'>Descripción</label>
                    <textarea id="descripcion" name="descripicion"
                        rows="5"
                        className='inputbasico mt-0'
                        value={platoEditable.descripcion}
                        onChange={(e) => setPlatoeditable({ ...platoEditable, descripcion: e.target.value })} />

                    <label className='text-gray-900 dark:text-gray-400' htmlFor='precio'>Precio</label>
                    <input id="precio" name="precio"
                        type="number"
                        step="any"
                        className='inputbasico mt-0'
                        value={platoEditable.precio}
                        onChange={(e) => setPlatoeditable({ ...platoEditable, [e.target.name]: e.target.value })} />
                    
                    <button 
                        type="button" 
                        className="mx-auto text-center p-4 w-full text-red-400 hover:text-red-300"
                        onClick={handleDelete}>Eliminar plato</button>
                    
                    <div className="flex gap-2">
                        <button type="button" className='botonrojo w-full' onClick={()=> selectPlato(null)}>cancelar</button>
                        <button type="submit" className='boton w-full'>Guardar cambios</button>
                    </div>
                </form>
            </div>
        </ModalDialog>
}
