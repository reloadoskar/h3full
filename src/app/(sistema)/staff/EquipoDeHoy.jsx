import { nombreDelDiaSegunFecha } from "@/utils/tools"

export default function EquipoDeHoy({staff}) {
    const hoy = nombreDelDiaSegunFecha(new Date())
    return !staff ? null :
        <div className=''>
            <h2 className='titulo'>El Equipo de hoy</h2>
            <div className=''>
                <ul className='flex gap-4 justify-center'>
                    {staff.filter(m => m.dias.find(e => e === hoy)).map(mmbr => (
                        <li key={mmbr._id}>
                            <div className='flex flex-col'>
                                <img className='mx-auto w-24 rounded-full object-cover aspect-square' src={mmbr.avatar} />
                                <div>
                                    {mmbr.nombre}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
}
