import { useRef, useState, useEffect } from "react"
import { useStaff } from "./StaffContext"

export default function MiembroForm({ user, action, close, prevStaff = null }) {
    const { puestos } = useStaff()
    const ref = useRef(null)
    const [guardando, setGuardando] = useState(false)
    const [newStaff, setNewstaff] = useState(prevStaff || {
        nombre: "",
        fecha: "",
        dias: [],
        desde: "",
        hasta: ""
    })
    const [selectedFiles, setSelectedFiles] = useState([])

    const handleClose = () => {
        setNewstaff({ nombre: "", puesto: "", email: "", telefono: "", sueldo: "", periodo: "", dias: [], desde: "", hasta: "" })
        close()
    }

    useEffect(() => {
        const handleOutsideClick = (e) => {
            // console.log(ref.current)
            // console.log(e.target)
            if (!ref.current.contains(e.target)) {
                handleClose()
            }
        }
        window.addEventListener("mousedown", handleOutsideClick)

        return () => {
            window.removeEventListener("mousedown", handleOutsideClick)
        }
    }, [ref])

    const handleSubmit = (e) => {
        e.preventDefault()
        setGuardando(true)

        const formData = new FormData();
        if (prevStaff) {
            formData.set('_id', prevStaff._id);
        }
        formData.set('database', user.database);
        formData.append('file', newStaff.file);
        formData.append('avatar', newStaff.avatar);
        formData.set('puesto', newStaff.puesto);
        formData.set('nombre', newStaff.nombre);
        formData.set('email', newStaff.email);
        formData.set('telefono', newStaff.telefono);
        formData.set('sueldo', newStaff.sueldo);
        formData.set('periodo', newStaff.periodo);
        formData.set('desde', newStaff.desde);
        formData.set('hasta', newStaff.hasta);
        formData.append('dias', JSON.stringify(newStaff.dias));

        action(formData).then(res => {
            if (res.status === 200) {
                handleClose()
                setGuardando(false)
                return
            }

            setGuardando(false)

        }).catch(e => console.log(e))
    }

    const handleChange = (e) => {
        let value = Array.from(e.target.selectedOptions, option => option.value);
        setNewstaff({ ...newStaff, dias: value });
    }

    const handleFileChange = (event) => {
        const fileList = event.target.files;
        const filesArray = Array.from(fileList);
        // console.log(filesArray)
        setSelectedFiles(filesArray);
        setNewstaff({ ...newStaff, avatar: filesArray[0], file: filesArray[0] })
    }

    return !guardando ?
        <form ref={ref} className='form mt-6 ' onSubmit={handleSubmit}>

            <div>
                {selectedFiles.map((file, index) => (
                    <div key={index}>
                        {/* <h4>{file.name}</h4> */}
                        <img src={URL.createObjectURL(file)} alt={file.name} style={{ maxWidth: '150px', maxHeight: '150px' }} className="mx-auto object-cover aspect-square rounded-full" />
                    </div>
                ))}
                <input name="file"
                    type="file"
                    className='flex flex-row py-3'
                    accept="image/*"
                    onChange={handleFileChange} />
            </div>
            <label htmlFor='puesto'>Puesto</label>
            <select id="puesto"
                name="puesto"
                required
                className='inputbasico'
                value={newStaff.puesto}
                onChange={(e) => setNewstaff({ ...newStaff, puesto: e.target.value })}
            >
                <option>{newStaff.puesto}</option>
                {puestos.length > 0 ?
                    puestos.map(puesto => (
                        <option key={puesto._id} value={puesto.nombre}>{puesto.nombre}</option>
                    ))
                    : null}
                <option>Crear puesto...</option>
            </select>

            <label htmlFor='nombre' className='label'>Nombre</label>
            <input id="nombre"
                name="nombre"
                required
                className='inputbasico'
                type="text"
                value={newStaff.nombre}
                onChange={(e) => setNewstaff({ ...newStaff, nombre: e.target.value })}
            />
            <label htmlFor='nombre' className='label'>eMail</label>
            <input id="email"
                name="email"
                required
                className='inputbasico'
                type="email"
                value={newStaff.email}
                onChange={(e) => setNewstaff({ ...newStaff, email: e.target.value })}
            />
            <label htmlFor='nombre' className='label'>Teléfono</label>
            <input id="telefono"
                name="telefono"
                required
                className='inputbasico'
                type="text"
                value={newStaff.telefono}
                onChange={(e) => setNewstaff({ ...newStaff, telefono: e.target.value })}
            />

            <div className='flex gap-2'>
                <div className="w-1/2">
                    <label htmlFor='desde' className='label'>Desde:</label>
                    <input id="desde"
                        name="desde"
                        required
                        className='inputbasico'
                        type="time"
                        value={newStaff.desde}
                        onChange={(e) => setNewstaff({ ...newStaff, desde: e.target.value })}
                    />

                </div>
                <div className="w-1/2">
                    <label htmlFor='hasta' className='label'>Hasta:</label>
                    <input id="hasta"
                        name="hasta"
                        required
                        className='inputbasico'
                        type="time"
                        value={newStaff.hasta}
                        onChange={(e) => setNewstaff({ ...newStaff, hasta: e.target.value })}
                    />

                </div>
            </div>

            <div className=''>
                <label>Días</label>
                <select id="dias" nombre="dias" className="inputbasico" value={newStaff.dias} multiple
                    onChange={handleChange}
                >
                    <option value="Lunes">Lunes</option>
                    <option value="Martes">Martes</option>
                    <option value="Miércoles">Miércoles</option>
                    <option value="Jueves">Jueves</option>
                    <option value="Viernes">Viernes</option>
                    <option value="Sábado">Sábado</option>
                    <option value="Domingo">Domingo</option>
                </select>
            </div>

            <div className='flex gap-2'>
                <div className="w-1/2">
                    <label htmlFor='nombre' className='label'>Sueldo</label>
                    <input id="sueldo"
                        name="sueldo"
                        required
                        className='inputbasico'
                        type="number"
                        value={newStaff.sueldo}
                        onChange={(e) => setNewstaff({ ...newStaff, sueldo: e.target.value })}
                    />
                </div>
                <div className="w-1/2">
                    <label htmlFor='nombre' className='label'>Periodo</label>
                    <select id="periodo"
                        name="periodo"
                        required
                        className='inputbasico'
                        value={newStaff.periodo}
                        onChange={(e) => setNewstaff({ ...newStaff, periodo: e.target.value })}
                    >
                        <option>{newStaff.periodo}</option>
                        <option value="SEMANAL">SEMANAL</option>
                        <option value="QUINCENAL">QUINCENAL</option>
                        <option value="MENSUAL">MENSUAL</option>
                    </select>
                </div>

            </div>

            <div className='flex gap-2'>
                <button type="button" className='botonrojo w-full' onClick={handleClose}>cancelar</button>
                <button type="submit" className='boton w-full'>Guardar</button>
            </div>

        </form>
        :
        <div className="flex ">
            <div className="titulo animate-pulse">
                Guardando...
            </div>
        </div>
}
