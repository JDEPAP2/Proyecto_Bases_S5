import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
        <p className='text-xl'>Seleccione una opción:</p>
        <div className='flex mt-10 gap-5'>
            <Link to='/usuarios' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Usuarios</Link>
            <Link to='/compañias' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Compañias</Link>
            <Link to='/cursos' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Cursos</Link>
        </div>
    </div>
  )
}

export default Home