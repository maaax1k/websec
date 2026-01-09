import React from 'react'

import brand1 from '../../assets/vr.webp'
import brand2 from '../../assets/tr.jpg'
import brand3 from '../../assets/xst.jpg'

function Brands() {
    const brands = [brand1, brand2, brand3]
    return (
        <div>
            <h2 className='text-2xl md:text-3xl mx-4 md:mx-7 font-bold my-3 text-neutral-900 tracking-tighter'>Brands</h2>
            <div className='flex flex-wrap md:flex-nowrap gap-4 md:gap-5 px-4 md:px-7 pt-5 pb-10 w-full'>
                {brands.map((item, index) => (
                    <div
                        key={index}
                        className='flex-1 min-w-[120px] aspect-video md:aspect-[4/5] overflow-hidden'
                    >
                        <img
                            src={item}
                            alt=""
                            className='w-full h-full object-cover rounded-lg hover:brightness-75 transition-all cursor-pointer'
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Brands