export default function Footer() {

    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-orange-500 text-white p-4 text-center w-full h-20 flex justify-center items-center">
            &copy; {currentYear} Sumber Makmur. All rights reserved.
        </footer>
    )
}