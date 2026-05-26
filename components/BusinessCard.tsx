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

  const photoUrl = photoReference
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photo_reference=${photoReference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    : "https://placehold.co/600x400?text=FKReview";

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