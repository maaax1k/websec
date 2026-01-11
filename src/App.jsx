import { useEffect, useState } from 'react'
import './App.css'
import api from './api/axios'
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
import Orders from './components/orders/Orders'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const initializeApp = async () => {
      try {
        const response = await api.post('/auth/refresh/');
        setAccessToken(response.data.access);
      } catch (err) {
        console.log("No active session.");
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-neutral-200 border-t-neutral-800 rounded-full animate-spin"></div>
          <p className="text-neutral-500 font-medium animate-pulse">Loading App...</p>
        </div>
      </div>
    );
  }
  return (
    <div className='mt-30'>
      <GoogleReCaptchaProvider reCaptchaKey="6LdrV0YsAAAAAG4Bh_QZZYNZlbJaJspHLLCjIFvE">
        <AuthProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='/catalog' element={<Catalog />} />
              <Route path='/login' element={<Login />} />
              <Route path='/registration' element={<Registration />} />
              <Route path='/verify-email' element={<VerifyEmail />} />
              <Route path='/user' element={<User />} />
              <Route path='/product/:id' element={<ProductDetail />} />
              <Route path='/contacts' element={<ContactUs />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/orders' element={<Orders />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </AuthProvider>
      </GoogleReCaptchaProvider>
    </div>
  )
}

export default App
