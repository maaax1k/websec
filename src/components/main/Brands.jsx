import React from 'react'

import brand1 from '../../assets/brand1.webp'

function Brands() {
    const brands = [brand1, brand1, brand1]
    return (
        <div>
            <h2 className='text-2xl md:text-3xl mx-4 md:mx-7 font-bold my-3 text-neutral-900 tracking-tighter'>Brands</h2>
            <div className='flex flex-wrap md:flex-nowrap gap-4 md:gap-10 mx-4 md:mx-7 pt-5 pb-10 justify-center md:justify-start'>
                {brands.map((item, index) =>(
                    <div key={index}>
                        <img src={item} alt="" className='rounded-lg hover:brightness-80 transition-all cursor-pointer'/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Brands