import React from 'react'
import Plato from './Plato'

export default function Platos({platos=[]}) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 '>
      {platos.length > 0 ? platos.map(plato=>(
        <Plato key={plato._id} plato={plato} />
      )) : 
      <div>No se encontraron platos.</div>
      }
    </div>
  )
}
