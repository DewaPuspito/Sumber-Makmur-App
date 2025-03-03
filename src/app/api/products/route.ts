import { axiosInstance } from '@/utils/api/product.api'
import { NextResponse } from 'next/server'

// -> handle response bisa menggunakan NextResponse (fitur bawaan dari Next.js) atau Response (fitur bawaan dari Node.js)
// -> handle request bisa menggunakan NextRequest (fitur bawaan dari Next.js) atau Request (fitur bawaan dari Node.js) 

// Handle GET Request -> untuk mengambil data produk dari database sumber makmur
export async function GET() {
    try {
        const response = await axiosInstance.get('/products')
        return NextResponse.json({
            status: 200,
            data: response.data,
        })

    } catch {
        return NextResponse.json({
            status: 500,
            message: 'Error fetching data'
        })

    }
}

// Handle POST Request -> untuk membuat data produk dari database sumber makmur
export async function POST(req: Request) {
    try {
        const body = await req.json() // Parse the request body into JSON
        await axiosInstance.post('/products', body) // Send the parsed body to the API
        return NextResponse.json({
            status: 201,
            message: 'Product data created successfully'
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: 'Error creating product data',
            detail: error
        })
    }
}