import type { Metadata } from 'next'
import LoginForm from '@/components/molecules/login.form.module'

export const metadata: Metadata = {
    title: 'Login - Sumber Makmur'
}
export default function Login() {
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <LoginForm />
        </div>
    )
}