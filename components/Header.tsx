import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-10 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-fkreview.png"
            alt="FKReview"
            width={150}
            height={45}
            priority
            className="object-contain"
          />
        </Link>

        {/* Navegación */}
        <nav className="flex items-center gap-8 text-sm font-medium text-[#0F172A]">
          <Link href="/" className="hover:text-[#3F7FD8] transition">
            Inicio
          </Link>

          <Link href="/businesses" className="hover:text-[#3F7FD8] transition">
            Negocios
          </Link>

          <Link href="#" className="hover:text-[#3F7FD8] transition">
            Categorías
          </Link>

          <button className="bg-[#3F7FD8] text-white px-5 py-2 rounded-md hover:opacity-90 transition">
            Iniciar Sesión
          </button>
        </nav>

      </div>
    </header>
  );
}