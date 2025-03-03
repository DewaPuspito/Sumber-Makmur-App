import type { Metadata } from "next"
import Footer from "@/components/atomics/footer.module"

export const metadata: Metadata = {
  title: 'Home - Sumber Makmur',
  description: 'Selamat datang di website Sumber Makmur, tempat terbaik untuk berbelanja alat pertukangan dan bahan bangunan'
}
export default function Home() {

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center mt-16">
      <main className="p-6 text-center">
        <h1 className="text-4xl font-bold text-orange-600">Welcome to Sumber Makmur</h1>
        <p className="mt-4 text-orange-600">Dapatkan informasi terbaru seputar alat pertukangan dan bahan bangunan</p>
      </main>
      <div className="absolute bottom-0 w-screen">
        <Footer />
      </div>
    </div>
  )
}