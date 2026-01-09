import React, { useEffect, useState } from 'react'
import Search from './Search'
import Products from './Products'
import api from '../../api/axios'

function Catalog() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState({ minPrice: '', maxPrice: '', category: '' })
  const [prod, setProd] = useState([])

  useEffect(() => {
    const getProducts = async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams();
            
            if (searchTerm) params.append('search', searchTerm);
            if (filter.category) params.append('category', filter.category);
            if (filter.brand) params.append('brand', filter.brand); // ДОБАВЛЕНО
            if (filter.minPrice) params.append('price_min', filter.minPrice);
            if (filter.maxPrice) params.append('price_max', filter.maxPrice);
            if (filter.ordering) params.append('ordering', filter.ordering);

            const res = await api.get(`/products/?${params.toString()}`);
            setProd(res.data);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
        }
    };
    getProducts();
}, [searchTerm, filter]);

  return (
    <div className='mx-[10%] my-10 bg-white rounded-2xl shadow-lg text-neutral-800'>
      <Search 
        currentSearch={{ searchTerm, setSearchTerm }} 
        currentFilter={{ filter, setFilter }} 
      />
      <Products products={prod} isLoading={isLoading} />
    </div>
  )
}

export default Catalog