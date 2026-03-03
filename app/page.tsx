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

      {/* CATEGORÍAS */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-10 text-center mb-16">
          <h2 className="text-4xl font-semibold text-[#0F172A]">
            Explora por categoría
          </h2>
        </div>

        <div className="max-w-6xl mx-auto px-10 grid md:grid-cols-3 gap-8">

          {[
            {
              title: "Restaurantes",
              desc: "Descubre experiencias gastronómicas verificadas en todo el país.",
            },
            {
              title: "Instituciones Públicas",
              desc: "Evalúa la calidad del servicio en entidades gubernamentales.",
            },
            {
              title: "Servicios Privados",
              desc: "Talleres, clínicas, comercios y empresas locales.",
            },
          ].map((cat, index) => (
            <div
              key={index}
              className="bg-white p-10 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <h3 className="text-2xl font-semibold text-[#0F172A] mb-4">
                {cat.title}
              </h3>
              <p className="text-gray-600">
                {cat.desc}
              </p>
            </div>
          ))}

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