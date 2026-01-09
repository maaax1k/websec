import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Main from './components/main/Main'
import Catalog from './components/catalog/Catalog'
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/logreg/Login'
import Registration from './components/logreg/Registration'
import VerifyEmail from './components/logreg/VerifyEmail'
import User from './components/userpage/User'
import ProductDetail from './components/product/ProductDetail'
import ContactUs from './components/contact/ContactUs'
import Cart from './components/cart/Cart'

function App() {
  return (
    <div className='mt-30'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/catalog' element={<Catalog/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/registration' element={<Registration/>}/>
          <Route path='/verify-email' element={<VerifyEmail/>}/>
          <Route path='/user' element={<User/>}/>
          <Route path='/product/:id' element={<ProductDetail/>}/>
          <Route path='/contacts' element={<ContactUs/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
