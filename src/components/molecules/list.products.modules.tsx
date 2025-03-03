"use client"
import React, { useEffect, useState } from 'react'
import { axiosInstance } from '@/utils/api/product.api'
import Card, { ICard } from '@/components/atomics/card.module'
import { useRouter, useSearchParams } from 'next/navigation'
import { addToCart } from '@/utils/redux/cartSlice'
import { useDispatch } from 'react-redux'
import Navbar from '../atomics/navbar.module'

export default function ListProduct() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || '')
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || 'All Categories')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [filteredProducts, setFilteredProducts] = useState<ICard[]>([])
    const [categories, setCategories] = useState<string[]>([])

    const dispatch = useDispatch()

    async function getAllProducts() {
        setIsLoading(true)
        try {
            const response = await axiosInstance.get('/products')

            // Kumpulkan kategori unik
            const uniqueCategories: string[] = ["All Categories"]
            response.data.forEach((item: ICard) => {
                if (!uniqueCategories.includes(item.category)) {
                    uniqueCategories.push(item.category)
                }
            })
            setCategories(uniqueCategories)

            // Filter berdasarkan pencarian dan kategori
            let filtered = response.data

            if (searchTerm) {
                filtered = filtered.filter((item: ICard) => 
                    item.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            }

            if (selectedCategory !== 'All Categories') {
                filtered = filtered.filter((item: ICard) => item.category === selectedCategory)
            }

            setFilteredProducts(filtered)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [searchTerm, selectedCategory])

    function updateUrl(search: string, category: string) {
        const params = new URLSearchParams()
        if (search) {
            params.set("search", search)
        }
        if (category && category !== "All Categories") {
            params.set("category", category)
        }
        router.push(`/products?${params.toString()}`)
    }

    function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchTerm(event.target.value)
        updateUrl(event.target.value, selectedCategory)
    }

    function handleCategoryChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedCategory(event.target.value)
        updateUrl(searchTerm, event.target.value)
    }

    return (
        <>
        <Navbar />
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
                    {categories.map((item, key) => (
                        <option key={key} value={item}>{item}</option>
                    ))}
                </select>
            </div>
            {isLoading ? (
                <div className='w-screen h-screen text-black font-bold text-2xl flex justify-center items-center'>
                    <h2>Sabar bos...</h2>
                </div>
            ) : (
                <div className='grid grid-cols-3 justify-center items-center w-full h-full gap-4'>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((item: any, key: number) => (
                            <Card
                                key={key}
                                name={item.name}
                                category={item.category}
                                description={item.description}
                                imageUrl={item.imageUrl}
                                price={item.price}
                                stock={item.stock}
                                onClick={() => dispatch(addToCart(item))}
                            />
                        ))
                    ) : (
                        <p className="col-span-3 text-center text-gray-500">No products found.</p>
                    )}
                </div>
            )}
        </div>
        </>
    )
}