"use client";

import Link from "next/link";

type BusinessCardProps = {
  id: number;
  nombre: string;
  categoria: string;
  ciudad: string;
  direccion?: string;
  calificacion: number;
  googleRating?: number;
  googleReviews?: number;
  photoReference?: string;
};

export default function BusinessCard({
  id,
  nombre,
  categoria,
  ciudad,
  direccion,
  calificacion,
  googleRating,
  googleReviews,
  photoReference,
}: BusinessCardProps) {

  const fallbackImages = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop",
];

const photoUrl =
  const categoryImages: Record<string, string> = {
  Restaurante:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",

  Cafetería:
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop",

  Hotel:
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",

  Barbería:
    "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1200&auto=format&fit=crop",

  Salón:
    "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1200&auto=format&fit=crop",

  Gym:
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",

  Farmacia:
    "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1200&auto=format&fit=crop",

  Supermercado:
    "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop",
};

const photoUrl =
  categoryImages[categoria] ||
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop";

  return (

    <div
      className="group bg-white rounded-2xl overflow-hidden transition-all duration-300
      border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1"
    >

      {/* IMAGE */}
      <div className="h-52 overflow-hidden bg-gray-100">

        <img
  src={photoUrl}
  alt={nombre}
  onError={(e) => {
    e.currentTarget.src =
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop";
  }}
  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
/>

      </div>

      {/* CONTENT */}
      <div className="p-6">

        <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">
          {categoria}
        </p>

        <h2 className="text-xl font-semibold text-[#0F172A] mb-3 group-hover:text-[#3F7FD8] transition-colors">
          {nombre}
        </h2>

        {/* ADDRESS / MAP */}
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            direccion || ciudad
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 text-sm mb-4 block hover:text-[#3F7FD8] transition"
        >
          📍 {direccion || ciudad}
        </a>

        {/* GOOGLE RATING */}
        {googleRating && (
          <div className="flex items-center gap-2 mb-4">

            <span className="text-yellow-500 text-lg">
              ★
            </span>

            <span className="font-semibold text-[#0F172A]">
              {googleRating.toFixed(1)}
            </span>

            <span className="text-sm text-gray-500">
              ({googleReviews || 0} Google reviews)
            </span>

          </div>
        )}

        <div className="h-px bg-gray-100 mb-4"></div>

        {/* FKREVIEW SCORE */}
        <div className="flex items-center justify-between mb-5">

          <span className="text-sm text-gray-500">
            FKReview Score
          </span>

          <span className="text-[#3F7FD8] font-semibold">
            {calificacion.toFixed(1)} / 5.0
          </span>

        </div>

        {/* REVIEW BUTTON */}
        <Link
          href={`/businesses/${id}`}
          className="w-full bg-[#3F7FD8] text-white py-3 rounded-xl
          font-medium text-center block hover:opacity-90 transition"
        >
          Ver Negocio y Opiniones
        </Link>

      </div>

    </div>
  );
}