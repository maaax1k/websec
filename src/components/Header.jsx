import cart from '/cart.png'
import userIcon from '../assets/user.png' 
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'; 

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
            // if (!localStorage.getItem('user')) return;

            try {
                const res = await api.get('/auth/me/');
                setUser(res.data);
                localStorage.setItem('user', JSON.stringify(res.data));
            } catch (err) {
                if (err.response?.status === 401) {
                    setUser(null);
                    localStorage.removeItem('user');
                }
            }
        };
    checkAuth();

    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  

  return (
    <header className={`flex items-center justify-between px-4 md:px-[10%] py-4 ${scrolled ? 'shadow-lg bg-white/97' : 'shadow-sm bg-white'} fixed w-full top-0 z-30 transition-shadow`} >
      <div className="flex-1">
        <Link to="/" className="rock-3d-regular text-3xl md:text-5xl font-bold text-neutral-800">
          SW Shop
        </Link>
      </div>

      <nav className="absolute left-1/2 transform -translate-x-1/2 hidden lg:block">
        <ul className="flex gap-4 md:gap-6 text-neutral-700 font-medium">
          <li><Link to="/" className="hover:text-neutral-900">Main Page</Link></li>
          <li><Link to="/catalog" className="hover:text-neutral-900">Catalog</Link></li>
          <li><Link to="/contacts" className="hover:text-neutral-900">Contact Us</Link></li>
        </ul>
      </nav>

      <div className="flex items-center gap-2 md:gap-4">
        <Link to='/cart' className="p-2 rounded hover:bg-neutral-100 cursor-pointer">
          <img src={cart} alt="cart" className="size-8 md:size-10" />
        </Link>


        {user ? (
          
          <div className="flex items-center le">
            <Link to="/user" className="p-2 rounded text-lg hover:bg-neutral-100 cursor-pointer h-14 w-14 flex items-center justify-center">
            {user.first_name[0]}<span className='text-yellow-500'>{user.last_name[0]}</span>
          </Link>
            
            
          </div>
        ) : (
          <Link to="/login" className="p-2 rounded hover:bg-neutral-100 cursor-pointer">
            <img src={userIcon} alt="user" className="size-8 md:size-10" />
          </Link>
        )}

        <button className="lg:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>


      {isOpen && (
        <nav className="absolute top-full left-0 w-full bg-white shadow-md lg:hidden border-t">
          <ul className="flex flex-col gap-4 p-4 text-gray-700 font-medium">
            <li><Link to="/" onClick={() => setIsOpen(false)}>Main Page</Link></li>
            <li><Link to="/catalog" onClick={() => setIsOpen(false)}>Catalog</Link></li>
            {!user && <li><Link to="/login" onClick={() => setIsOpen(false)}>Login</Link></li>}
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;