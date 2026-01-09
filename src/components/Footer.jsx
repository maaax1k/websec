import React from 'react'

function Footer() {
    return (
        <footer className='bg-neutral-900 px-4 md:px-[10%] py-10'>
            <div className='flex flex-col md:flex-row items-center justify-between'>
                <div className='flex flex-col md:flex-row items-center mb-4 md:mb-0'>
                    <h1 className='rock-3d-regular text-white text-4xl md:text-8xl mr-0 md:mr-10'>SW Shop</h1>
                    <div className='text-neutral-400 text-center md:text-left mt-2 md:mt-0'>
                        <p className=''>&copy;SWShop</p>
                        <p>2014-2025</p>
                        <p>All rights are reserved</p>
                    </div>
                </div>
                <div className='text-white flex flex-row md:flex-col gap-4 md:gap-0'>
                    <a className='hover:text-neutral-300 transition-colors'>Instagram</a>
                    <a className='hover:text-neutral-300 transition-colors'>Telegram</a>
                    <a className='hover:text-neutral-300 transition-colors'>WhatsApp</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer