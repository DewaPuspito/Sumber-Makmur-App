"use client"
import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'

import { RootState } from '@/utils/redux/store/store'

export default function Navbar() {

    const [storedEmail, setStoredEmail] = useState<string | undefined>("")
    const router = useRouter()
    const pathname = usePathname()
    const cart = useSelector((state: RootState) => state.cart.items)

    useEffect(() => {
        const emailCookie = Cookies.get("email")
        setStoredEmail(emailCookie)
        if (storedEmail !== undefined) {
            return
        } else {
            router.push('/auth/login')
        }
    }, [])

    if (pathname === '/auth/register' || pathname === '/auth/login') {
        return null
    }

    return (
        <div className='w-screen h-20 p-4 bg-orange-500 text-white flex justify-between items-center fixed top-0'>
            <div className='text-lg font-semibold'>
                <h2>Sumber Makmur</h2>
            </div>
            <div className='flex gap-x-5 items-center'>
                <svg
                    onClick={() => router.push('/products/cart')}
                    xmlns="http://www.w3.org/2000/svg" className='w-6 h-6 cursor-pointer' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg> : {cart.length}
                <p>Home</p>
                <p>{storedEmail !== undefined ? `Hello, ${storedEmail}` : "Profile"}</p>
            </div>
        </div>
    )
}