import { axiosInstance } from '@/utils/api/product.api'

// page ini menggunakan SSR tanpa harus mengambil getServerSideProps terlebih dahulu
export default async function ProductDetail({ params }: { params: { id: string } }) {

    const { id } = await params
    const product = await axiosInstance.get(`/products/${id}`)
    console.log('product -> ', product.data)

    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='flex gap-x-5 h-1/2 w-96 p-3 shadow rounded-md'>
                <img className='h-full w-40' src={product?.data?.imageUrl === "https://www.sumbermakmur.com" ? product?.data?.imageUrl : 'https://i.pinimg.com/736x/2a/86/a5/2a86a560f0559704310d98fc32bd3d32.jpg'} />
                <div className='flex flex-col text-black gap-y-5'>
                    <h2>{product?.data?.name}</h2>
                    <p>{product?.data?.description}</p>
                </div>
            </div>
        </div>
    )
}