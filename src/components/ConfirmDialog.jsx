
export default function ConfirmDialog({ user, open, close, action, data }) {
    if (!open) return null
    const handleClose = () => {
        close()
    }
    const handleDelete = () => {
        action(user.database, data).then(()=>{
            close()
        })
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div classname="flex flex-col gap-4 bg-gray-600 bg-opacity-100 p-4">
                <div className="titulo">¿Confirma eliminar?</div>
                <div className="text-center text-2xl">{data.nombre || data.descripcion}</div>
                <div className="flex gap-4">
                    <button className="botonrojo" onClick={handleClose}>cancelar</button>
                    <button className="botonrojofull" onClick={handleDelete}>eliminar</button>
                </div>
            </div>
        </div>
    )
}
