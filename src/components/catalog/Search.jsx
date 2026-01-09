import React, { useState, useEffect } from 'react'
import api from '../../api/axios'

function Search({ currentSearch, currentFilter }) {
    // Локальные состояния для полей ввода (чтобы не спамить запросами при каждом символе)
    const [localSearch, setLocalSearch] = useState(currentSearch.searchTerm)
    const [minPrice, setMinPrice] = useState(currentFilter.filter.minPrice)
    const [maxPrice, setMaxPrice] = useState(currentFilter.filter.maxPrice)
    const [category, setCategory] = useState(currentFilter.filter.category)
    const [ordering, setOrdering] = useState('')
    const [brand, setBrand] = useState(currentFilter.filter.brand || '')
    const [brands, setBrands] = useState([])

    // Состояние для списка категорий с сервера
    const [categories, setCategories] = useState([])

    // Загружаем категории один раз при монтировании
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get('/categories/') // Уточни эндпоинт категорий
                setCategories(res.data)
            } catch (err) {
                console.error("Не удалось загрузить категории", err)
            }
        }

        const fetchFilterData = async () => {
            try {
                const [catRes, brandRes] = await Promise.all([
                    api.get('/categories/'),
                    api.get('/brands/') // Предполагаемый эндпоинт для брендов
                ]);
                setCategories(catRes.data);
                setBrands(brandRes.data);
            } catch (err) {
                console.error("Ошибка загрузки фильтров", err);
            }
        };
        fetchFilterData();
        fetchCategories()
    }, [])

    // Функция применения всех фильтров
    const handleApplyFilters = () => {
        currentSearch.setSearchTerm(localSearch)
        currentFilter.setFilter({
            minPrice,
            maxPrice,
            category,
            brand,
            ordering
        })
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleApplyFilters()
    }

    // Очистка
    const clearAll = () => {
        setLocalSearch(''); setMinPrice(''); setMaxPrice('');
        setCategory(''); setBrand(''); setOrdering('');
        currentSearch.setSearchTerm('');
        currentFilter.setFilter({ minPrice: '', maxPrice: '', category: '', brand: '', ordering: '' });
    }

    return (
        <div className="p-6 border-b border-neutral-100">
            {/* Строка поиска */}
            <div className="mb-6 flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Поиск по названию, бренду, артикулу..."
                        value={localSearch}
                        onChange={(e) => setLocalSearch(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="w-full pl-4 pr-10 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-800 transition-all"
                    />
                    {localSearch && (
                        <button
                            onClick={() => setLocalSearch('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900"
                        >
                            ✕
                        </button>
                    )}
                </div>
                <button
                    onClick={handleApplyFilters}
                    className="bg-neutral-900 text-white py-3 px-8 rounded-xl hover:bg-neutral-700 transition-all cursor-pointer font-bold active:scale-95"
                >
                    Найти
                </button>
            </div>

            {/* Сетка фильтров */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-neutral-400 mb-2 ml-1">Бренд</label>
                    <select
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="w-full p-3 border border-neutral-200 rounded-xl bg-neutral-50 focus:outline-none focus:border-neutral-800 transition-colors cursor-pointer"
                    >
                        <option value="">Все бренды</option>
                        {brands.map(b => (
                            <option key={b.id} value={b.id}>{b.name}</option>
                        ))}
                    </select>
                </div>
                {/* Категория */}
                <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-neutral-400 mb-2 ml-1">Категория</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-3 border border-neutral-200 rounded-xl bg-neutral-50 focus:outline-none focus:border-neutral-800 transition-colors cursor-pointer"
                    >
                        <option value="">Все категории</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                {/* Цена ОТ */}
                <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-neutral-400 mb-2 ml-1">Цена от</label>
                    <input
                        type="number"
                        placeholder="0"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-full p-3 border border-neutral-200 rounded-xl bg-neutral-50 focus:outline-none focus:border-neutral-800"
                    />
                </div>

                {/* Цена ДО */}
                <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-neutral-400 mb-2 ml-1">Цена до</label>
                    <input
                        type="number"
                        placeholder="∞"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full p-3 border border-neutral-200 rounded-xl bg-neutral-50 focus:outline-none focus:border-neutral-800"
                    />
                </div>

                {/* Сортировка */}
                <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-neutral-400 mb-2 ml-1">Сортировка</label>
                    <select
                        value={ordering}
                        onChange={(e) => setOrdering(e.target.value)}
                        className="w-full p-3 border border-neutral-200 rounded-xl bg-neutral-50 focus:outline-none focus:border-neutral-800 cursor-pointer"
                    >
                        <option value="">По умолчанию</option>
                        <option value="price">Дешевле — Дороже</option>
                        <option value="-price">Дороже — Дешевле</option>
                        <option value="name">По алфавиту (А-Я)</option>
                        <option value="-id">Сначала новые</option>
                    </select>
                </div>
            </div>

            {/* Активные фильтры (теги) */}
            <div className="flex flex-wrap gap-2 items-center">
                <button
                    onClick={handleApplyFilters}
                    className="text-xs font-bold text-neutral-800 underline mr-4 cursor-pointer hover:text-neutral-500"
                >
                    Применить фильтры
                </button>

                {(currentSearch.searchTerm || currentFilter.filter.category || currentFilter.filter.minPrice || currentFilter.filter.maxPrice) && (
                    <button
                        onClick={clearAll}
                        className="text-xs font-bold text-red-500 hover:text-red-700 cursor-pointer mr-4"
                    >
                        Сбросить всё
                    </button>
                )}

                {/* Теги */}
                <div className="flex flex-wrap gap-3 items-center min-h-[40px]">

                    <div className="flex flex-wrap gap-2">
                        {/* Тег Поиска */}
                        {currentSearch.searchTerm && (
                            <span className="flex items-center gap-2 px-3 py-1.5 bg-neutral-900 text-white rounded-lg text-xs font-medium">
                                <span>Поиск: {currentSearch.searchTerm}</span>
                                <button
                                    onClick={() => currentSearch.setSearchTerm('')}
                                    className="hover:text-red-400 transition-colors cursor-pointer font-bold ml-1"
                                >
                                    ✕
                                </button>
                            </span>
                        )}

                        {/* Тег Категории */}
                        {currentFilter.filter.category && (
                            <span className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100 text-neutral-800 rounded-lg text-xs font-medium border border-neutral-200">
                                <span>Категория: {categories.find(c => c.id == currentFilter.filter.category)?.name || 'Выбрано'}</span>
                                <button
                                    onClick={() => currentFilter.setFilter(prev => ({ ...prev, category: '' }))}
                                    className="text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer font-bold ml-1"
                                >
                                    ✕
                                </button>
                            </span>
                        )}
                        {currentFilter.filter.brand && (
                            <span className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100 text-neutral-800 rounded-lg text-xs font-medium border border-neutral-200">
                                <span>Бренд: {brands.find(b => b.id == currentFilter.filter.brand)?.name || 'Выбрано'}</span>
                                <button
                                    onClick={() => {
                                        currentFilter.setFilter(prev => ({ ...prev, brand: '' }));
                                        setBrand('');
                                    }}
                                    className="text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer font-bold ml-1"
                                >
                                    ✕
                                </button>
                            </span>
                        )}

                        {/* Тег Цены */}
                        {(currentFilter.filter.minPrice || currentFilter.filter.maxPrice) && (
                            <span className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100 text-neutral-800 rounded-lg text-xs font-medium border border-neutral-200">
                                <span>Цена: {currentFilter.filter.minPrice || 0} — {currentFilter.filter.maxPrice || '∞'} $</span>
                                <button
                                    onClick={() => {
                                        currentFilter.setFilter(prev => ({ ...prev, minPrice: '', maxPrice: '' }));
                                        setMinPrice('');
                                        setMaxPrice('');
                                    }}
                                    className="text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer font-bold ml-1"
                                >
                                    ✕
                                </button>
                            </span>
                        )}

                        {/* Тег Сортировки */}
                        {currentFilter.filter.ordering && (
                            <span className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100 text-neutral-800 rounded-lg text-xs font-medium border border-neutral-200">
                                <span>Сортировка: {
                                    currentFilter.filter.ordering === 'price' ? 'Дешевле' :
                                        currentFilter.filter.ordering === '-price' ? 'Дороже' :
                                            currentFilter.filter.ordering === 'name' ? 'А-Я' : 'Новинки'
                                }</span>
                                <button
                                    onClick={() => currentFilter.setFilter(prev => ({ ...prev, ordering: '' }))}
                                    className="text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer font-bold ml-1"
                                >
                                    ✕
                                </button>
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search