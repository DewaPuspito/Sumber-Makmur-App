'use client'
import { Provider } from "react-redux"
import { store } from "@/utils/redux/store/store"

interface IProvider {
    children?: React.ReactNode
}

export default function ReduxProvider ({ children }: IProvider) {
    return( 
    <Provider store={store}>
        {children}
    </Provider> )
}