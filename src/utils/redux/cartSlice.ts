import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { axiosInstance } from '../api/product.api';

interface CartItem {
    objectId?: string;
    name: string;
    price: number;
    image?: string;
    quantity?: number;
    stock: number;
}

interface CartState {
    items: CartItem[]
}

const initialState: CartState = {
    items: []
}

// thunk untuk mendapatkan stock dari API sumber makmur
export const fetchStock = createAsyncThunk('cart/fetchStock', async (objectId: string) => {
    const response = await axiosInstance.get(`/products/${objectId}`)
    return {
        id: objectId,
        stock: response.data?.stock
    }
})

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartItem>) {
            const existingItems = state.items.find((item: CartItem) => item.objectId === action.payload.objectId)
            if (existingItems) {
                if (existingItems.quantity && existingItems.quantity < existingItems.stock) {
                    existingItems.quantity += 1
                }
            } else {
                state.items.push({ ...action.payload, quantity: 1 })
            }
        },
        increaseQuantity(state, action: PayloadAction<string>) {
            const item = state.items.find((item: CartItem) => item.objectId === action.payload)
            if (item?.quantity && item.quantity < item.stock) {
                item.quantity += 1
            }
        },
        decreaseQuantity(state, action: PayloadAction<string>) {
            const item = state.items.find((item: CartItem) => item.objectId === action.payload)
            if (item?.quantity && item.quantity < item.stock) {
                item.quantity -= 1
            } else {
                state.items = state.items.filter((item: CartItem) => item.objectId !== action.payload)
            }
        },
        removeFromCart(state, action: PayloadAction<string>) {
            state.items = state.items.filter((item: CartItem) => item.objectId !== action.payload)
        },
        clearCart(state) {
            state.items = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStock.fulfilled, (state, action) => {
                const item = state.items.find((item: CartItem) => item.objectId === action.payload.id)
                if (item) {
                    item.stock = action.payload.stock
                }
            })
            .addCase(fetchStock.rejected, (state) => {
                state.items = []
            })
    }
})

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer