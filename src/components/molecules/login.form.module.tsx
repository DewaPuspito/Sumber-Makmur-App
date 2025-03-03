"use client"
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Cookies from 'js-cookie'
import Swal from "sweetalert2";

import { LoginFormData, loginSchema } from "@/utils/validator/login.schema";
import { axiosInstance } from "@/utils/api/product.api";

export default function LoginForm() {
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    })

    async function onSubmitLogin(data: LoginFormData) {
        try {
            const response = await axiosInstance.get(`/users_sumber?where=email='${data.email}'`)
            Cookies.set("email", data.email, { expires: 7 })
            if (response) {
                Swal.fire({
                    title: 'Success',
                    text: 'Successfully login',
                    confirmButtonText: 'OK'
                }).then((response) => {
                    if (response.isConfirmed) {
                        router.push('/products')
                    }
                })
            }
        } catch (error) {
            Swal.fire({
                title: 'Failed',
                text: 'Failed register, please try again later',
                confirmButtonText: 'OK'
            })
        }
    }

    return (
        <div className="flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit(onSubmitLogin)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                            {...register("email")}
                        />
                        {
                            errors.email &&
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        }
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                            {...register("password")}
                        />
                        {
                            errors.password &&
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        }
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}