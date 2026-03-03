"use client";

import { use, useState, useEffect, useMemo } from "react";

type Review = {
  id: number;
  usuario: string;
  comentario: string;
  calificacion: number;
  createdAt: string;
};

export default function BusinessDetailClient({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const businessId = Number(id);

  const [reseñas, setReseñas] = useState<Review[]>([]);
  const [nombre, setNombre] = useState("");
  const [comentario, setComentario] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // 🔹 Cargar reseñas
  useEffect(() => {
    if (!businessId || isNaN(businessId)) return;

    const cargarReseñas = async () => {
      try {
        const res = await fetch(`/api/reviews?businessId=${businessId}`);

        if (!res.ok) throw new Error("Error API");

        const data = await res.json();

        setReseñas(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    cargarReseñas();
  }, [businessId]);

  const reseñasOrdenadas = useMemo(() => {
    return [...reseñas].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );
  }, [reseñas]);

  const totalOpiniones = reseñas.length;

  const promedio =
    totalOpiniones > 0
      ? reseñas.reduce((acc, r) => acc + r.calificacion, 0) /
        totalOpiniones
      : 0;

  const agregarReseña = async () => {
    if (!nombre || !comentario) return;

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario: nombre,
          comentario,
          calificacion: rating,
          businessId,
        }),
      });

      if (!res.ok) throw new Error("Error guardando");

      const nueva = await res.json();
      setReseñas((prev) => [nueva, ...prev]);

      setNombre("");
      setComentario("");
      setRating(5);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 md:px-10 py-14">

      {/* HEADER */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-10 shadow-sm border border-gray-100 mb-10">

        <h1 className="text-4xl font-semibold text-[#0F172A] mb-6">
          Restaurante El Buen Sabor
        </h1>

        <div className="flex items-center gap-4">
          <div className="flex">
            {[1,2,3,4,5].map((star) => (
              <span
                key={star}
                className={`text-2xl ${
                  star <= Math.round(promedio)
                    ? "text-[#3F7FD8]"
                    : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>

          <span className="text-[#3F7FD8] font-semibold">
            {promedio.toFixed(1)}
          </span>

          <span className="text-gray-500 text-sm">
            ({totalOpiniones} opiniones)
          </span>
        </div>
      </div>

      {/* FORMULARIO */}
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#0F172A] to-[#1E293B] rounded-2xl p-10 shadow-xl mb-12">

        <h2 className="text-2xl text-white mb-8">
          Escribir Opinión
        </h2>

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full bg-white rounded-lg px-4 py-3"
          />

          <textarea
            placeholder="Comparte tu experiencia..."
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            rows={4}
            className="w-full bg-white rounded-lg px-4 py-3"
          />

          <div className="flex gap-2">
            {[1,2,3,4,5].map((star) => {
              const active = star <= (hoverRating || rating);
              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className={`text-3xl ${
                    active ? "text-[#3F7FD8]" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              );
            })}
          </div>

          <button
            onClick={agregarReseña}
            className="w-full bg-[#3F7FD8] text-white py-3 rounded-md"
          >
            Publicar Opinión
          </button>

        </div>
      </div>

      {/* RESEÑAS */}
      <div className="max-w-4xl mx-auto space-y-6">

        {loading && (
          <p className="text-center text-gray-500">
            Cargando opiniones...
          </p>
        )}

        {!loading && !error && totalOpiniones === 0 && (
          <p className="text-center text-gray-500">
            Aún no hay opiniones.
          </p>
        )}

        {!loading && reseñasOrdenadas.map((r) => (
          <div
            key={r.id}
            className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm"
          >
            <div className="flex justify-between mb-3">

              <div>
                <span className="font-medium text-[#0F172A]">
                  {r.usuario}
                </span>
                <p className="text-xs text-gray-400">
                  {new Date(r.createdAt).toLocaleDateString("es-DO")}
                </p>
              </div>

              <div className="flex">
                {[1,2,3,4,5].map((star) => (
                  <span
                    key={star}
                    className={`text-lg ${
                      star <= r.calificacion
                        ? "text-[#3F7FD8]"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <p className="text-gray-600">
              {r.comentario}
            </p>
          </div>
        ))}

      </div>

    </main>
  );
}