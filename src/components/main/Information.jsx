import React from 'react'

function Information() {
    return (
        <div className='flex flex-col md:flex-row px-4 md:px-15 py-10 gap-4 md:gap-20 text-sm border-t-1'>
            <div className='flex flex-col items-center text-center gap-2 w-full md:w-1/4'>
                <svg aria-hidden="true" focusable="false" fill="none" strokeWidth="1.5" width="24" className="block icon icon-picto-send" viewBox="0 0 24 24">
                    <path clipRule="evenodd" d="M2.05 10.387a1.487 1.487 0 0 1-.069-2.841L22.05 1a.751.751 0 0 1 .949.943l-6.541 20.081a1.486 1.486 0 0 1-2.841-.07l-2.246-9.331-9.322-2.236Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M22.815 1.18 11.372 12.623" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <p className='font-bold'>FREE RETURNS</p>
                <p>Not content with your purchase or need an exchange? We offer easy and hassle free returns!</p>
            </div>
            <div className='flex flex-col items-center text-center gap-2 w-full md:w-1/4'>
                <svg aria-hidden="true" focusable="false" fill="none" strokeWidth="1.5" width="24" className="block icon icon-picto-box" viewBox="0 0 24 24">
                    <path clipRule="evenodd" d="M.75 5.25 12 9.75l11.25-4.5L12 .75.75 5.25Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path clipRule="evenodd" d="M.75 5.25v13.5L12 23.25V9.75L.75 5.25v0Zm22.5 0v13.5L12 23.25V9.75l11.25-4.5v0Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="m18.187 7.275-11.25-4.5M20.625 16.5l-1.875.75" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <p className='font-bold'>FREE SHIPPING</p>
                <p>Free standard shipping on all domestic orders over $250!</p>
            </div>
            <div className='flex flex-col items-center text-center gap-2 w-full md:w-1/4'>
                <svg aria-hidden="true" focusable="false" fill="none" strokeWidth="1.5" width="24" className="block icon icon-picto-customer-support" viewBox="0 0 24 24">
                    <path d="M12.75 15.75h3v4.5l4.5-4.5h1.494c.832 0 1.506-.674 1.506-1.506V2.25a1.5 1.5 0 0 0-1.5-1.5h-12a1.5 1.5 0 0 0-1.5 1.5v4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M19.875 7.875a.375.375 0 1 0 0 .75.375.375 0 0 0 0-.75m-7.5 0a.375.375 0 1 0 0 .75.375.375 0 0 0 0-.75m3.75 0a.375.375 0 1 0 0 .75.375.375 0 0 0 0-.75" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path clipRule="evenodd" d="M6.75 16.5a3.375 3.375 0 1 0 0-6.75 3.375 3.375 0 0 0 0 6.75Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M12.75 23.25a6.054 6.054 0 0 0-12 0" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <p className='font-bold'>LOWEST PRICES GUARANTEED!</p>
                <p>We'll match the price if you buy a qualifying item at Streetwear Official and then find the identical item for less at another qualifying retailer.</p>
            </div>
            <div className='flex flex-col items-center text-center gap-2 w-full md:w-1/4'>
                <svg aria-hidden="true" focusable="false" fill="none" strokeWidth="1.5" width="24" className="block icon icon-picto-award-gift" viewBox="0 0 24 24">
                    <path clipRule="evenodd" d="M15.75 23.238a3 3 0 0 0-3-3H9a3 3 0 0 0-3-3H.75v6h15Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M6 20.238h3m2.25-3H21a.75.75 0 0 0 .75-.75v-6.75m-13.5 0v4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path clipRule="evenodd" d="M6.75 6.738a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-15a.75.75 0 0 1-.75-.75v-2.25Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M15 17.238V5.988" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path clipRule="evenodd" d="M19.265 3.867a11.855 11.855 0 0 1-4.242 2.121 11.856 11.856 0 0 1 2.121-4.242C18.463.428 19.21.63 19.8 1.216c.59.586.784 1.333-.535 2.651Zm-8.531 0c1.257.985 2.7 1.707 4.242 2.121a11.838 11.838 0 0 0-2.121-4.242C11.537.428 10.79.63 10.2 1.216c-.59.586-.784 1.333.534 2.651Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <p className='font-bold'>Genuine Product Guaranteed</p>
                <p>We aim to only offer our fans the best and most authentic products at low prices.</p>
            </div>
        </div>
    )
}

export default Information