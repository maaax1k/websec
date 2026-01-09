import React, { useEffect } from 'react'
import Banner from './Banner'
import MiniCatalog from './MiniCatalog'
import Brands from './Brands'
import Information from './Information'

function Main() {
  useEffect(()=>{
    window.scrollTo(0, 0);
  }, [])
  return (
    <div className='mx-[10%] my-10 bg-white rounded-2xl shadow lg text-neutral-800'>
        <Banner/>
        <MiniCatalog/>
        <Brands/>
        <Information/>
    </div>
  )
}

export default Main