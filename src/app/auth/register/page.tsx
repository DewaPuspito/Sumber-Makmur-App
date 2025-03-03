import { Metadata } from 'next'
import RegisterForm from '@/components/molecules/register.form.module'

export const metadata: Metadata = {
    title: 'Register - Sumber Makmur'
}
export default function Register() {
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <RegisterForm />
        </div>
    )
}