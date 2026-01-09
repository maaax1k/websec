import React from 'react'
import { Link } from 'react-router-dom'

function Banner() {
    return (
        <div className="flex flex-col md:flex-row">
            <img src="banner.jpg" alt="" width="100%" className='w-full md:w-2/3 rounded-t-2xl md:rounded-tl-2xl rounded-bl-2xl md:rounded-tr-none rounded-bl-none' />
            <div className='flex flex-col w-full md:w-1/3 items-center justify-center text-center bg-neutral-900 text-white rounded-b-2xl md:rounded-bl-none md:rounded-br-none md:rounded-tr-2xl'>
                <h2 className='text-4xl uppercase lg:text-5xl font-bold italic mt-6 tracking-tighter'>Streetwear</h2>
                <p className='text-center text-yellow-500 text-xl lg:text-2xl mt-3 tracking-tighter'>New arrivals</p>
                <p className='mt-2 text-neutral-300'>Free shipping for orders over $100</p>
                <Link to="/catalog" className=' transition-all block mx-auto my-6 px-6 py-2 bg-white text-black rounded-lg hover:bg-neutral-300 cursor-pointer'>shop now</Link>
            </div>
        </div>
    )
}

export default Banner