"use client"
import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import Link from 'next/link'

import { RootState } from '@/utils/redux/store/store'

export default function Navbar() {
    const [storedEmail, setStoredEmail] = useState<string | undefined>("")
    const [showCartAndProfile, setShowCartAndProfile] = useState<boolean>(false)

    const router = useRouter()
    const pathname = usePathname()
    const cart = useSelector((state: RootState) => state.cart.items)

    useEffect(() => {
        const emailCookie = Cookies.get("email")
        setStoredEmail(emailCookie)

        if (!emailCookie) {
            router.push('/auth/login')
        }
    }, [router])

    useEffect(() => {
        setShowCartAndProfile(pathname.startsWith('/products'))
    }, [pathname])

    if (pathname === '/auth/register' || pathname === '/auth/login') {
        return null
    }

    return (
        <nav className='w-screen h-20 p-4 bg-orange-500 text-white flex justify-between items-center fixed top-0 shadow-md' role="navigation" aria-label="Main Navigation">
            <div className='text-lg font-semibold cursor-pointer'>
                <Link href="/" aria-label="Go to Home">Sumber Makmur</Link>
            </div>
            <div className='flex gap-x-6 items-center'>
                <Link href="/" className='cursor-pointer hover:text-gray-200' aria-label="Home Page">Home</Link>
                <Link href="/about" className='cursor-pointer hover:text-gray-200' aria-label="About Us">About</Link>
                <Link href="/teams" className='cursor-pointer hover:text-gray-200' aria-label="Our Teams">Teams</Link>
                {showCartAndProfile && (
                    <>
                        <div className='relative flex items-center cursor-pointer' onClick={() => router.push('/products/cart')} role="button" aria-label="Shopping Cart">
                            <svg
                                xmlns="http://www.w3.org/2000/svg" className='w-6 h-6' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1" />
                                <circle cx="20" cy="21" r="1" />
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                            {cart.length > 0 && (
                                <span className='absolute top-0 right-0 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full' aria-label={`Cart contains ${cart.length} items`}>{cart.length}</span>
                            )}
                        </div>
                        <p className='font-semibold' aria-label="User Profile">
                            {storedEmail ? `Hello, ${storedEmail}` : "Profile"}
                        </p>
                    </>
                )}
            </div>
        </nav>
    )
}