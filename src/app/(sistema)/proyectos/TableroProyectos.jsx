import React from 'react'
import { useProyectos } from './ContextProyecto'
import ProgressBar from '@/components/ProgressBar'
import moment from 'moment'

export default function TableroProyectos() {
	const { proyectos } = useProyectos()
	return proyectos.length > 0 ?
		<div className='flex flex-col gap-2'>
			{proyectos.map(proyecto => {
				let a = moment(proyecto.createdAt)
				let b = moment(proyecto.fechae)
				let now = moment()
				let total_dias = a.diff(b, 'days')
				let dias_que_quedan = now.diff(b, 'days')
				let pbar = ((dias_que_quedan * 100) / total_dias) 
				// console.log(pbar)
				return (
					<div key={proyecto._id} className='px-4 flex gap-4'>
						<div className='basis-2/6'>{proyecto.cliente.nombre}</div>
						<div className='basis-auto w-full'><ProgressBar value={pbar} /></div>
						<div className='basis-2/6'>{dias_que_quedan} dias para entregar</div>
					</div>
				)
			})}
		</div>
		: null
}
