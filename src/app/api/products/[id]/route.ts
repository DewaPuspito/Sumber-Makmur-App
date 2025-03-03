import { axiosInstance } from '@/utils/api/product.api'

import { NextRequest, NextResponse } from 'next/server'

// -> handle response bisa menggunakan NextResponse (fitur bawaan dari Next.js) atau Response (fitur bawaan dari Node.js)
// -> handle request bisa menggunakan NextRequest (fitur bawaan dari Next.js) atau Request (fitur bawaan dari Node.js) 

// Handle GET Request -> untuk mengambil data detail produk berdasarkan id dari database sumber makmur
export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
    try {
        const {id} = await params
        const productId = await axiosInstance.get('/products')
        console.log('list id -->', productId)

        if(!id) {
            return NextResponse.json({
                status: 400,
                message: 'Missing id parameter'
            })
        }

        const response = await axiosInstance.get(`/products/${id}`)
        return NextResponse.json ({
            status: 200,
            data: response.data
        })

    } catch {
        return NextResponse.json({
            status: 500,
            message: 'Error fetching data'
        })
    }
}

export async function PUT(req: NextRequest, {params}: {params: {id: string}}) {
    try {
        const {id} = params
        const productId = await axiosInstance.get('/products')

        await axiosInstance.put(`/products/${id}`)
        return NextResponse.json({
            status: 201,
            message: 'Product data updated successfully'
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: 'Error updating data'
        })
    }
}

export async function Delete(req: NextRequest, {params}: {params: {id: string}}) {
    try {
        const {id} = params
        const productId = await axiosInstance.get('/products')
        const productExist = productId.data.some((product: {id: string}) => product.id === id)

        if (!productExist) {
            return NextResponse.json(
                { status: 404, message: 'Product ID not found' },
                { status: 404 }
            )
        }
        
        await axiosInstance.delete(`/products/${id}`)
        return NextResponse.json({
            status: 201,
            message: 'Product data updated successfully'
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: 'Error updating data'
        })
    }
}