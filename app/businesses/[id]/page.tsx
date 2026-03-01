"use client";

import { useState, useMemo } from "react";

export default function BusinessDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const negocio = {
    nombre: "Restaurante El Buen Sabor",
    categoria: "Restaurante",
    ciudad: "Santo Domingo",
  };

  const [reseñas, setReseñas] = useState([
    {
      usuario: "Carlos Martínez",
      comentario: "Excelente servicio y comida de alta calidad.",
      calificacion: 5,
      fecha: new Date(),
      verificado: true,
    },
  ]);

  const [nombre, setNombre] = useState("");
  const [comentario, setComentario] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  // 🔹 Ordenar por más recientes automáticamente
  const reseñasOrdenadas = useMemo(() => {
    return [...reseñas].sort(
      (a, b) => b.fecha.getTime() - a.fecha.getTime()
    );
  }, [reseñas]);

  const totalOpiniones = reseñas.length;

  const promedio =
    totalOpiniones > 0
      ? reseñas.reduce((acc, r) => acc + r.calificacion, 0) /
        totalOpiniones
      : 0;

  const agregarReseña = () => {
    if (!nombre || !comentario) return;

    const nuevaReseña = {
      usuario: nombre,
      comentario,
      calificacion: rating,
      fecha: new Date(),
      verificado: false,
    };

    setReseñas([...reseñas, nuevaReseña]);

    setNombre("");
    setComentario("");
    setRating(5);
  };

  return (
    <main className="min-h-screen bg-gray-50 px-10 py-14">

      {/* Información del negocio */}

      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-10 shadow-sm border border-gray-100 mb-10">

        <p className="text-sm uppercase tracking-widest text-gray-400 mb-3">
          {negocio.categoria}
        </p>

        <h1 className="text-4xl font-semibold text-[#0F172A] mb-6">
          {negocio.nombre}
        </h1>

        {/* Promedio dinámico animado */}
        <div className="flex items-center gap-4">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-2xl transition-all duration-300 ${
                  star <= Math.round(promedio)
                    ? "text-[#3F7FD8] scale-110"
                    : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>

          <span className="text-[#3F7FD8] font-semibold text-lg transition-all duration-300">
            {promedio.toFixed(1)}
          </span>

          <span className="text-gray-500 text-sm">
            ({totalOpiniones} opiniones)
          </span>
        </div>
      </div>

      {/* Formulario */}

      <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#0F172A] to-[#1E293B] rounded-2xl p-10 shadow-xl mb-12">

        <h2 className="text-2xl font-semibold text-white mb-8">
          Escribir Opinión
        </h2>

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#3F7FD8] transition"
          />

          <textarea
            placeholder="Comparte tu experiencia..."
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            rows={4}
            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#3F7FD8] transition"
          />

          {/* Estrellas interactivas */}
          <div>
            <p className="text-white text-sm mb-2">
              Seleccione una calificación
            </p>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const active = star <= (hoverRating || rating);

                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className={`text-3xl transition duration-200 ${
                      active
                        ? "text-[#3F7FD8] scale-110"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={agregarReseña}
            className="w-full bg-[#3F7FD8] text-white py-3 rounded-md font-medium hover:opacity-90 transition"
          >
            Publicar Opinión
          </button>

        </div>
      </div>

      {/* Lista de reseñas */}

      <div className="max-w-4xl mx-auto space-y-6">

        {reseñasOrdenadas.map((reseña, index) => (
          <div
            key={index}
            className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm"
          >
            <div className="flex justify-between items-start mb-3">

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[#0F172A]">
                    {reseña.usuario}
                  </span>

                  {reseña.verificado && (
                    <span className="text-xs bg-[#3F7FD8] text-white px-2 py-0.5 rounded-full">
                      Verificado
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-400 mt-1">
                  {reseña.fecha.toLocaleDateString("es-DO", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* Estrellas visuales */}
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-lg ${
                      star <= reseña.calificacion
                        ? "text-[#3F7FD8]"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">
              {reseña.comentario}
            </p>
          </div>
        ))}

      </div>

    </main>
  );
}