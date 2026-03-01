"use client";

import Link from "next/link";

type BusinessCardProps = {
  id: number;
  nombre: string;
  categoria: string;
  ciudad: string;
  calificacion: number;
};

export default function BusinessCard({
  id,
  nombre,
  categoria,
  ciudad,
  calificacion,
}: BusinessCardProps) {
  return (
    <Link href={`/businesses/${id}`} className="group">
      <div className="bg-white rounded-xl p-7 transition-all duration-300 
                      border border-gray-100 
                      shadow-sm hover:shadow-xl 
                      hover:-translate-y-1">

        <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">
          {categoria}
        </p>

        <h2 className="text-xl font-semibold text-[#0F172A] mb-4 group-hover:text-[#3F7FD8] transition-colors">
          {nombre}
        </h2>

        <p className="text-gray-500 text-sm mb-6">
          {ciudad}
        </p>

        <div className="h-px bg-gray-100 mb-5"></div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Calificación
          </span>

          <span className="text-[#3F7FD8] font-semibold">
            {calificacion.toFixed(1)} / 5.0
          </span>
        </div>

      </div>
    </Link>
  );
}