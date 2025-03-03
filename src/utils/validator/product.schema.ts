import {z as zod} from 'zod'

export const productSchema = zod.object({
    objectId: zod.string().optional(),
    name: zod.string().min(3, 'Nama produk minimal 3 karakter'),
    price: zod.number().min(1000, 'Harga produk minimal Rp1.000'),
    stock: zod.number().min(1, 'Stok minimal 1 barang')
})

export type ProductInput = zod.infer<typeof productSchema> 