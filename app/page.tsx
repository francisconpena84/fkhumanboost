"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

/* CONTADOR ANIMADO */
function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = value / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [value]);

  return <span>{count.toLocaleString()}</span>;
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setLoading(false);
      }, 600);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  /* INTRO */
  if (loading) {
    return (
      <div
        className={`fixed inset-0 bg-[#F5F2EC] flex flex-col items-center justify-center text-[#0F172A] transition-opacity duration-700 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex flex-col items-center animate-fadeInUp">
          <Image
            src="/logo-fkreview.png"
            alt="FKReview"
            width={150}
            height={150}
            className="mb-8"
            priority
          />
          <h1 className="text-xl tracking-[0.3em] text-[#3F7FD8] font-medium text-center">
            Transparencia · Confianza · Comunidad
          </h1>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white animate-fadeIn">

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#111827] to-[#1E293B] text-white">
        <div className="max-w-7xl mx-auto px-10 py-32 text-center">
          <h1 className="text-5xl md:text-6xl font-semibold leading-tight mb-6">
            La plataforma de reseñas
            <br />
            <span className="text-[#3F7FD8]">
              más confiable de República Dominicana
            </span>
          </h1>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
            Descubre, evalúa y comparte experiencias sobre restaurantes,
            instituciones públicas y servicios en todo el país.
          </p>

          <div className="flex justify-center gap-6">
            <Link
              href="/businesses"
              className="bg-[#3F7FD8] px-8 py-4 rounded-md text-white font-medium hover:opacity-90 transition"
            >
              Explorar Negocios
            </Link>

            <Link
              href="/businesses"
              className="border border-gray-400 px-8 py-4 rounded-md text-white hover:bg-white hover:text-[#0F172A] transition"
            >
              Ver Opiniones
            </Link>
          </div>
        </div>
      </section>

      {/* MÉTRICAS CON CONTADOR */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-10 grid md:grid-cols-3 gap-12 text-center">

          <div>
            <h3 className="text-4xl font-semibold text-[#0F172A] mb-3">
              <AnimatedCounter value={1250} />+
            </h3>
            <p className="text-gray-600">
              Opiniones publicadas
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-semibold text-[#0F172A] mb-3">
              <AnimatedCounter value={32} />
            </h3>
            <p className="text-gray-600">
              Cobertura en las 32 provincias del país
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-semibold text-[#0F172A] mb-3">
              4.<AnimatedCounter value={6} />
            </h3>
            <p className="text-gray-600">
              Calificación promedio nacional
            </p>
          </div>

        </div>
      </section>

    
      {/* SOBRE FKREVIEW */}
<section className="relative py-28 bg-gray-50 overflow-hidden">

  {/* BACKGROUND GLOW */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#3F7FD8]/10 blur-3xl rounded-full"></div>

  <div className="relative max-w-6xl mx-auto px-10">

    <div className="grid md:grid-cols-2 gap-20 items-center">

      {/* LEFT */}
      <div>

        <div className="inline-flex items-center gap-2 bg-[#3F7FD8]/10 text-[#3F7FD8] px-4 py-2 rounded-full text-sm font-medium mb-8">
          ⭐ Plataforma Dominicana de Opiniones
        </div>

        <h2 className="text-5xl font-semibold text-[#0F172A] leading-tight mb-8">
          Transparencia y confianza
          <br />
          para descubrir negocios reales
        </h2>

        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          FKReview conecta personas con negocios confiables mediante
          opiniones auténticas, calificaciones verificadas y experiencias
          compartidas por la comunidad.
        </p>

        <p className="text-lg text-gray-600 leading-relaxed mb-10">
          Explora restaurantes, hoteles, farmacias, gimnasios y cientos
          de servicios locales en República Dominicana.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-wrap gap-5">

          <Link
            href="/businesses"
            className="bg-[#3F7FD8] text-white px-8 py-4 rounded-xl font-medium hover:opacity-90 transition shadow-lg shadow-[#3F7FD8]/20"
          >
            Explorar Negocios
          </Link>

          <Link
            href="/businesses"
            className="bg-white border border-gray-200 text-[#0F172A] px-8 py-4 rounded-xl font-medium hover:border-[#3F7FD8] hover:text-[#3F7FD8] transition"
          >
            Ver Opiniones
          </Link>

        </div>

      </div>

      {/* RIGHT */}
      <div className="relative">

        {/* FLOATING CARD 1 */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-6 hover:-translate-y-1 transition">

          <div className="flex items-center justify-between mb-5">

            <div>
              <h3 className="text-2xl font-semibold text-[#0F172A]">
                Restaurante RD
              </h3>

              <p className="text-gray-500 text-sm">
                Santo Domingo
              </p>
            </div>

            <div className="bg-yellow-50 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold">
              ★ 4.8
            </div>

          </div>

          <p className="text-gray-600 leading-relaxed">
            “Excelente experiencia, servicio rápido y ambiente increíble.”
          </p>

        </div>

        {/* FLOATING CARD 2 */}
        <div className="bg-[#0F172A] text-white rounded-3xl p-8 shadow-2xl ml-10 hover:-translate-y-1 transition">

          <div className="flex items-center justify-between mb-5">

            <div>
              <h3 className="text-2xl font-semibold">
                Hotel Caribe
              </h3>

              <p className="text-gray-400 text-sm">
                Punta Cana
              </p>
            </div>

            <div className="bg-white/10 px-4 py-2 rounded-full text-sm font-semibold">
              ★ 4.9
            </div>

          </div>

          <p className="text-gray-300 leading-relaxed">
            “Una plataforma súper útil para descubrir negocios confiables.”
          </p>

        </div>

      </div>

    </div>

  </div>

</section>
{/* SEO / EXPLORAR RD */}
<section className="py-28 bg-white">

  <div className="max-w-6xl mx-auto px-10">

    {/* TITLE */}
    <div className="text-center mb-20">

      <div className="inline-flex items-center gap-2 bg-[#3F7FD8]/10 text-[#3F7FD8] px-4 py-2 rounded-full text-sm font-medium mb-6">
        🇩🇴 Negocios en República Dominicana
      </div>

      <h2 className="text-5xl font-semibold text-[#0F172A] mb-6">
        Explora negocios y servicios
        <br />
        en todo el país
      </h2>

      <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Descubre restaurantes, hoteles, farmacias, gimnasios,
        cafeterías y cientos de negocios locales con opiniones
        reales compartidas por la comunidad.
      </p>

    </div>

    {/* GRID */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

      {[
  {
    title: "Restaurantes en Santo Domingo",
    desc: "Explora restaurantes populares y experiencias gastronómicas verificadas en Santo Domingo.",
    link: "/businesses?categoria=Restaurante",
  },
  {
    title: "Hoteles en Punta Cana",
    desc: "Encuentra hoteles recomendados por viajeros y usuarios locales en Punta Cana.",
    link: "/businesses?categoria=Hotel",
  },
  {
    title: "Farmacias y Clínicas",
    desc: "Consulta opiniones reales sobre farmacias, clínicas y servicios médicos.",
    link: "/businesses?categoria=Farmacia",
  },
  {
    title: "Gimnasios y Fitness",
    desc: "Descubre gimnasios y centros fitness con mejores valoraciones de usuarios.",
    link: "/businesses?categoria=Gym",
  },
  {
    title: "Cafeterías y Panaderías",
    desc: "Encuentra cafeterías y coffee shops favoritos de la comunidad.",
    link: "/businesses?categoria=Cafetería",
  },
  {
    title: "Servicios Locales",
    desc: "Talleres, comercios y servicios privados evaluados por clientes reales.",
    link: "/businesses",
  },
].map((item, index) => (

  <Link
    key={index}
    href={item.link}
    className="group bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:border-[#3F7FD8]/30 hover:shadow-xl hover:-translate-y-1 transition block"
  >

    <h3 className="text-2xl font-semibold text-[#0F172A] mb-4 group-hover:text-[#3F7FD8] transition">
      {item.title}
    </h3>

    <p className="text-gray-600 leading-relaxed">
      {item.desc}
    </p>

  </Link>

))}

    </div>

  </div>

</section>
{/* WHY FKREVIEW */}
<section className="py-28 bg-gray-50">

  <div className="max-w-6xl mx-auto px-10">

    {/* HEADER */}
    <div className="text-center mb-20">

      <div className="inline-flex items-center gap-2 bg-[#3F7FD8]/10 text-[#3F7FD8] px-4 py-2 rounded-full text-sm font-medium mb-6">
        🔒 Transparencia y Confianza
      </div>

      <h2 className="text-5xl font-semibold text-[#0F172A] mb-6">
        ¿Por qué confiar en FKReview?
      </h2>

      <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Nuestra misión es ayudar a las personas a tomar mejores decisiones
        mediante opiniones auténticas y experiencias compartidas por usuarios reales.
      </p>

    </div>

    {/* FEATURES */}
    <div className="grid md:grid-cols-3 gap-8">

      {[
        {
          title: "Opiniones auténticas",
          desc: "Las experiencias compartidas ayudan a crear una comunidad basada en transparencia y confianza.",
          icon: "⭐",
        },
        {
          title: "Negocios reales",
          desc: "Explora restaurantes, hoteles y servicios locales en toda República Dominicana.",
          icon: "🏢",
        },
        {
          title: "Comunidad en crecimiento",
          desc: "FKReview continúa creciendo para conectar consumidores y negocios locales.",
          icon: "🚀",
        },
      ].map((item, index) => (

        <div
          key={index}
          className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm hover:shadow-xl transition"
        >

          <div className="text-5xl mb-6">
            {item.icon}
          </div>

          <h3 className="text-2xl font-semibold text-[#0F172A] mb-4">
            {item.title}
          </h3>

          <p className="text-gray-600 leading-relaxed">
            {item.desc}
          </p>

        </div>

      ))}

    </div>

  </div>

</section>
{/* FAQ SEO */}
<section className="py-28 bg-white">

  <div className="max-w-5xl mx-auto px-10">

    {/* HEADER */}
    <div className="text-center mb-20">

      <div className="inline-flex items-center gap-2 bg-[#3F7FD8]/10 text-[#3F7FD8] px-4 py-2 rounded-full text-sm font-medium mb-6">
        ❓ Preguntas Frecuentes
      </div>

      <h2 className="text-5xl font-semibold text-[#0F172A] mb-6">
        Todo sobre FKReview
      </h2>

      <p className="text-lg text-gray-600 leading-relaxed">
        Respuestas rápidas sobre cómo funciona nuestra plataforma.
      </p>

    </div>

    {/* FAQ ITEMS */}
    <div className="space-y-6">

      {[
        {
          q: "¿Qué es FKReview?",
          a: "FKReview es una plataforma de opiniones diseñada para ayudar a las personas a descubrir negocios y servicios confiables en República Dominicana.",
        },
        {
          q: "¿Cómo funcionan las opiniones?",
          a: "Los usuarios pueden compartir experiencias reales y evaluar negocios utilizando comentarios y calificaciones.",
        },
        {
          q: "¿Puedo reclamar mi negocio?",
          a: "Sí. Los propietarios pueden solicitar el control de su perfil para administrar información y fortalecer su presencia digital.",
        },
        {
          q: "¿Qué tipo de negocios aparecen en FKReview?",
          a: "Restaurantes, hoteles, gimnasios, farmacias, cafeterías, servicios locales y muchos otros negocios en República Dominicana.",
        },
        {
          q: "¿FKReview es gratuito?",
          a: "Sí. Explorar negocios, leer opiniones y descubrir servicios es completamente gratuito para los usuarios.",
        },
      ].map((item, index) => (

        <div
          key={index}
          className="bg-gray-50 border border-gray-100 rounded-3xl p-8 hover:shadow-lg transition"
        >

          <h3 className="text-2xl font-semibold text-[#0F172A] mb-4">
            {item.q}
          </h3>

          <p className="text-gray-600 leading-relaxed text-lg">
            {item.a}
          </p>

        </div>

      ))}

    </div>

  </div>

</section>
{/* FEATURED BUSINESSES */}
<section className="py-28 bg-gray-50">

  <div className="max-w-7xl mx-auto px-10">

    {/* HEADER */}
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">

      <div>

        <div className="inline-flex items-center gap-2 bg-[#3F7FD8]/10 text-[#3F7FD8] px-4 py-2 rounded-full text-sm font-medium mb-6">
          ⭐ Negocios Destacados
        </div>

        <h2 className="text-5xl font-semibold text-[#0F172A] mb-4">
          Descubre negocios populares
        </h2>

        <p className="text-lg text-gray-600 max-w-2xl">
          Explora algunos de los negocios mejor valorados por la comunidad en FKReview.
        </p>

      </div>

      <Link
        href="/businesses"
        className="bg-[#0F172A] text-white px-6 py-4 rounded-xl font-medium hover:opacity-90 transition"
      >
        Ver Todos
      </Link>

    </div>

    {/* GRID */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

      {[
        {
          nombre: "Restaurante RD",
          categoria: "Restaurante",
          ciudad: "Santo Domingo",
          rating: "4.8",
          image:
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
        },
        {
          nombre: "Hotel Caribe",
          categoria: "Hotel",
          ciudad: "Punta Cana",
          rating: "4.9",
          image:
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
        },
        {
          nombre: "Gym Power Fit",
          categoria: "Gym",
          ciudad: "Santiago",
          rating: "4.7",
          image:
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
        },
      ].map((business, index) => (

        <div
          key={index}
          className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition"
        >

          {/* IMAGE */}
          <div className="h-56 overflow-hidden">

            <img
              src={business.image}
              alt={business.nombre}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />

          </div>

          {/* CONTENT */}
          <div className="p-8">

            <div className="flex items-center justify-between mb-4">

              <span className="text-sm uppercase tracking-widest text-gray-400">
                {business.categoria}
              </span>

              <span className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                ★ {business.rating}
              </span>

            </div>

            <h3 className="text-2xl font-semibold text-[#0F172A] mb-3 group-hover:text-[#3F7FD8] transition">
              {business.nombre}
            </h3>

            <p className="text-gray-500">
              📍 {business.ciudad}
            </p>

          </div>

        </div>

      ))}

    </div>

  </div>

</section>
      {/* ÚLTIMAS OPINIONES */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-10 text-center mb-16">
          <h2 className="text-4xl font-semibold text-[#0F172A]">
            Últimas Opiniones
          </h2>
        </div>

        <div className="max-w-6xl mx-auto px-10 grid md:grid-cols-3 gap-8">

          {[
            {
              nombre: "Restaurante El Buen Sabor",
              comentario: "Excelente servicio y ambiente.",
            },
            {
              nombre: "Hospital Central RD",
              comentario: "Atención rápida y profesional.",
            },
            {
              nombre: "Auto Servicio Premium",
              comentario: "Muy buena experiencia y calidad.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-xl border border-gray-100"
            >
              <h3 className="font-semibold text-[#0F172A] mb-3">
                {item.nombre}
              </h3>
              <p className="text-gray-600">
                "{item.comentario}"
              </p>
            </div>
          ))}

        </div>
      </section>

    </main>
  );
}