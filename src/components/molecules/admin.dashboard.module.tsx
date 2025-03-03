"use client"
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { productSchema, ProductInput } from '@/utils/validator/product.schema'
import { axiosInstance } from '@/utils/api/product.api'
import Swal from 'sweetalert2'

export default function AdminDashboard() {
    const [products, setProducts] = useState<ProductInput[] | null>(null)
    const [editProduct, setEditProduct] = useState<ProductInput | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<ProductInput>({
        resolver: zodResolver(productSchema)
    })
    
    async function fetchProducts() {
        const response = await axiosInstance.get('/products')
        setProducts(response.data)
    }

    async function onSubmitProduct(data: ProductInput) {
        const bodyRequest: ProductInput = {
            name: data.name,
            price: Number(data.price),
            stock: Number(data.stock)
        }
        if (editProduct) {
            await axiosInstance.put(`/products/${editProduct.objectId}`, bodyRequest)
            Swal.fire('Success', 'Produk berhasil diperbarui', 'success')
        } else {
            await axiosInstance.post('/products', bodyRequest)
            Swal.fire('Success', 'Produk berhasil dibuat', 'success')
        }

        fetchProducts()
        setEditProduct(null)
        reset()
        setIsModalOpen(false)
    }

    async function deleteProduct(id: string | undefined) {
        try {
            await axiosInstance.delete(`/products/${id}`)
            Swal.fire('Success', 'Produk berhasil dihapus', 'success')
            fetchProducts()
        } catch {
            Swal.fire('Failed', 'Produk gagal dihapus. Coba lagi', 'error')
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    function openModal(product?: ProductInput) {
        if (product) {
            setEditProduct(product)
            setValue('name', product.name)
            setValue('price', product.price)
            setValue('stock', product.stock)
        } else {
            setEditProduct(null)
            reset()
        }
        setIsModalOpen(true)
    }

    return (
        <div className='w-screen min-h-screen p-6 bg-gray-100 mt-36'>
            <h1 className='text-2xl font-bold mb-4'>Sumber Makmur Dashboard</h1>
            <button onClick={() => openModal()} className='px-4 py-2 bg-blue-600 text-white rounded'>
                Tambah Produk
            </button>

            <table className='w-full mt-6 border'>
                <thead>
                    <tr className='bg-gray-200 border'>
                        <th className='p-2 border'>Nama</th>
                        <th className='p-2 border'>Harga</th>
                        <th className='p-2 border'>Stock</th>
                        <th className='p-2 border'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((item, key) => (
                        <tr key={key}>
                            <td className='p-2 border'>{item.name}</td>
                            <td className='p-2 border'>{item.price}</td>
                            <td className='p-2 border'>{item.stock}</td>
                            <td className='p-2 border flex gap-2'>
                                <button onClick={() => openModal(item)} className='px-2 py-1 bg-yellow-500 text-white rounded'>
                                    Edit
                                </button>
                                <button onClick={() => deleteProduct(item?.objectId)} className='px-2 py-1 bg-red-500 text-white rounded'>
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center'>
                    <div className='bg-white p-6 rounded shadow-lg w-96'>
                        <h2 className='text-lg font-bold'>{editProduct ? 'Edit Produk' : 'Tambah Produk'}</h2>
                        <form onSubmit={handleSubmit(onSubmitProduct)}>
                            <div className='mt-4'>
                                <label>Nama Produk</label>
                                <input type='text' className='block w-full p-2 border rounded' {...register('name')} />
                                {errors.name && <p className='text-red-500 mt-2'>{errors.name.message}</p>}
                            </div>
                            <div className='mt-4'>
                                <label>Harga</label>
                                <input type='number' className='block w-full p-2 border rounded'   {...register('price', { setValueAs: v => Number(v) })} />
                                {errors.price && <p className='text-red-500 mt-2'>{errors.price.message}</p>}
                            </div>
                            <div className='mt-4'>
                                <label>Stock</label>
                                <input type='number' className='block w-full p-2 border rounded'   {...register('stock', { setValueAs: v => Number(v) })} />
                                {errors.stock && <p className='text-red-500 mt-2'>{errors.stock.message}</p>}
                            </div>
                            <button type='submit' className='w-full mt-6 p-2 bg-blue-600 text-white rounded'>
                                {editProduct ? 'Update' : 'Tambah'}
                            </button>
                            <button onClick={() => setIsModalOpen(false)} className='w-full mt-2 p-2 bg-gray-400 text-white rounded'>
                                Tutup
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}