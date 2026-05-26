"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewBusinessPage() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);

  const crearNegocio = async () => {
    if (!nombre || !categoria || !ciudad) return;

    try {
      setLoading(true);

      const response = await fetch("/api/businesses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          categoria,
          ciudad,
          direccion,
          telefono,
          website,
        }),
      });

      if (!response.ok) {
        throw new Error("Error creando negocio");
      }

      router.push("/businesses");
      router.refresh();

    } catch (error) {
      console.error(error);
      alert("Error creando negocio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-14">

      <div className="max-w-3xl mx-auto bg-white rounded-2xl p-10 shadow-sm border border-gray-100">

        <h1 className="text-4xl font-semibold text-[#0F172A] mb-8">
          Registrar Negocio
        </h1>

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Nombre del negocio"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3"
          />

          <input
            type="text"
            placeholder="Categoría"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3"
          />

          <input
            type="text"
            placeholder="Ciudad"
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3"
          />

          <input
            type="text"
            placeholder="Dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3"
          />

          <input
            type="text"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3"
          />

          <input
            type="text"
            placeholder="Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3"
          />

          <button
            onClick={crearNegocio}
            disabled={loading}
            className="w-full bg-[#3F7FD8] text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
          >
            {loading ? "Guardando..." : "Registrar Negocio"}
          </button>

        </div>
      </div>

    </main>
  );
}