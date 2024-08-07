import React from 'react'

export default function MenuContexto({top, left}) {
    return (
        <div className={`py-2 absolute w-52 bg-gray-400 dark:bg-gray-600 top-[${top}px] left-[${left}px] rounded`}>
            <ul>
                <li className='px-2 hover:bg-gray-200 dark:hover:bg-gray-500'>Ver</li>
                <li className='px-2 hover:bg-gray-200 dark:hover:bg-gray-500'>Editar</li>
                <li className='px-2 hover:bg-gray-200 dark:hover:bg-gray-500'>Eliminar</li>
            </ul>
        </div>
    )
}
