"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/utils/redux/store/store'
import { increaseQuantity, decreaseQuantity, fetchStock } from '@/utils/redux/cartSlice'

interface CartItem {
    objectId?: string;
    name: string;
    price: number;
    quantity: number;
    stock: number;
    image: string;
}

export default function Cart() {
    const [totalAmount, setTotalAmount] = useState<number>(0)
    const dispatch = useDispatch<AppDispatch>()
    const cart = useSelector((state: RootState) => state.cart.items)

    useEffect(() => {
        cart.forEach((item: CartItem | any) => {
            if (item.objectId) {
                dispatch(fetchStock(item.objectId))
            }
        })
        const total = cart.reduce((acc: number, item: CartItem | any) => acc + item.price * item.quantity, 0)
        setTotalAmount(total)
    }, [cart, dispatch])

    return (
        <>
            <div className='p-8 mt-16 flex flex-col justify-center items-center w-screen h-screen'>

                <h2 className='text-2xl font-bold mb-4'>Shopping Cart</h2>
                {
                    cart.length === 0 ?
                        <p className='text-xl text-orange-600 font-semibold'>Your cart is empty</p> :
                        <div className='space-y-5'>
                            {
                                cart.map((item: CartItem | any, key: number) => (
                                    <div key={key} className='flex justify-between items-center border p-4 rounded'>
                                        <img src={item.image} alt={item.name} className='w-16 h-16 object-cover mr-4' />
                                        <div className='flex flex-col items-center mx-10'>
                                            <h3 className='text-lg font-bold'>{item.name}</h3>
                                            <p>{item.price * item.quantity}</p>
                                        </div>
                                        <div className='flex items-center'>
                                            <button className='px-2' onClick={() => item.objectId && dispatch(decreaseQuantity(item.objectId))}>-</button>
                                            <span className='px-4'>{item.quantity}</span>
                                            <button className={`px-2 ${item.quantity >= item.stock ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => item.objectId && dispatch(increaseQuantity(item.objectId))}>+</button>
                                        </div>
                                    </div>
                                ))
                            }
                            <h2 className='text-red-500 font-semibold'>Total Amount : {totalAmount} </h2>
                        </div>
                }
            </div>
        </>

    )
}