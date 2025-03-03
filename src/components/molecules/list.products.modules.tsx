"use client"
import React, { useEffect, useState } from 'react'
import { axiosInstance } from '@/utils/api/product.api'
import Card, { ICard } from '@/components/atomics/card.module'
import Navbar from '../atomics/navbar.module'

import { addToCart } from '@/utils/redux/cartSlice'
import { useDispatch } from 'react-redux'

export default function ListProduct() {
    const [product, setProduct] = useState<ICard[]>([])
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [filteredProducts, setFilteredProduct] = useState<ICard[]>([])
    const [categories, setCategories] = useState<string[]>([])

    const dispatch = useDispatch()

    async function getAllProducts() {
        setIsLoading(true)
        try {
            const response = await axiosInstance.get('/products')
            setProduct(response.data)

            // -- kumpulkan kategorinya
            const uniqueCategories: string[] = []
            response.data.forEach((item: ICard) => {
                if (!uniqueCategories.includes(item.category)) {
                    uniqueCategories.push(item.category)
                }
            })
            setCategories(uniqueCategories) // -> masukkan setiap kategori ke state categories

            // -- buat fitur search
            let filtered = response.data // -> masukkan setiap yang difilter/search sementara
            if (searchTerm) {
                filtered = filtered.filter((item: ICard) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
            }

            // -- buat fitur filter by category
            if (selectedCategory !== 'All Categories') {
                filtered = filtered.filter((item: ICard) => item.category === selectedCategory)
            } else {
                filtered
            }

            setFilteredProduct(filtered) // -> hasilnya ditampung disini
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [searchTerm, selectedCategory])

    function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchTerm(event.target.value);
        // Clue: Filter products based on searchTerm
    }

    function handleCategoryChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedCategory(event.target.value);
        // Clue: Filter products based on selectedCategory
    }

    return (
        <>
        <Navbar/>
        <div className='w-full h-full p-3 mt-16'>
            <div className='flex justify-between mb-4'>
                <input
                    type='text'
                    placeholder='Search products...'
                    className='border p-2 rounded-md w-1/3'
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <select
                    className='border p-2 rounded-md w-1/4'
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                >
                    <option value='All Categories'>All Categories</option>
                    {
                        categories.map((item, key) => (
                            <option key={key} value={item}>{item}</option>
                        ))
                    }
                </select>
            </div>
            {
                isLoading === false ?
                    <div className='grid grid-cols-3 justify-center items-center w-full h-full gap-4'>
                        {
                            filteredProducts.length > 0 ? (
                                filteredProducts.map((item: any, key: number) => (
                                    <Card
                                        key={key}
                                        name={item?.name}
                                        category={item?.category}
                                        description={item?.description}
                                        imageUrl={item?.imageUrl}
                                        price={item?.price}
                                        stock={item?.stock}
                                        onClick={() => dispatch(addToCart(item))}
                                    />
                                ))
                            ) : (
                                <p className="col-span-3 text-center text-gray-500">No products found.</p>
                            )
                        }
                    </div> :
                    <div className='w-screen h-screen text-black font-bold text-2xl justify-center items-center mx-auto my-auto'>
                        <h2>Sabar bos...</h2>
                    </div>
            }
        </div>
        </>
    )
}