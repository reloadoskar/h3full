import React from 'react'
// import Image from 'next/image'
import { useMenu } from './MenuContext'
export default function Plato({ plato }) {
  const {selectPlato} = useMenu()

  // const handleClick = (plt) => {
  //   selectPlato(plt)
  // }
  return (
    <div className='flex flex-col p-5 bg-gray-300 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-700 cursor-pointer rounded-sm items-stretch' onClick={()=>selectPlato(plato)}>
      
      <div className='font-bold text-2xl'>{plato.nombre}</div>
      
      <div className='font-semibold text-sm text-gray-600 dark:text-gray-500 '>{plato.categoria}</div>
      
      <img src={plato.filepath} alt={plato.nombre} width={300} height={250}
        // style={{ maxWidth: '300px', maxHeight: '300px' }} 
        className='w-full rounded-lg max-h-56 text-center my-3 object-cover aspect-square'
      />
      
      <div>{plato.descripcion}</div>
      
      <div className='text-right'>$ {plato.precio}</div>
    </div>
  )
}
