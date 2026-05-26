"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BusinessCard from "../../components/BusinessCard";

export default function BusinessesPage() {

  const [negocios, setNegocios] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");

  const searchParams = useSearchParams();

  // LOAD BUSINESSES
  useEffect(() => {
    const cargarNegocios = async () => {
      try {
        const response = await fetch("/api/businesses");
        const data = await response.json();

        setNegocios(data);
      } catch (error) {
        console.error(error);
      }
    };

    cargarNegocios();
  }, []);

  // CATEGORY FROM URL
  useEffect(() => {
    const categoriaURL = searchParams.get("categoria");

    if (categoriaURL) {
      setCategoriaActiva(categoriaURL);
    }
  }, [searchParams]);

  // FILTERS
  const negociosFiltrados = negocios.filter((negocio) => {

    const texto = search.toLowerCase();

    const coincideBusqueda =
      negocio.nombre.toLowerCase().includes(texto) ||
      negocio.categoria.toLowerCase().includes(texto) ||
      negocio.ciudad.toLowerCase().includes(texto);

    const coincideCategoria =
      categoriaActiva === "Todos" ||
      negocio.categoria
        .toLowerCase()
        .includes(categoriaActiva.toLowerCase().replace("s", ""));

    return coincideBusqueda && coincideCategoria;
  });

  return (
    <main className="min-h-screen bg-gray-50 p-10">

      {/* HEADER */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        <div>
          <h1 className="text-4xl font-semibold text-[#0F172A] mb-3">
            Negocios Registrados
          </h1>

          <p className="text-gray-500">
            Descubre negocios, restaurantes y servicios evaluados por la comunidad.
          </p>
        </div>

        <Link
          href="/businesses/new"
          className="bg-[#3F7FD8] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition text-center"
        >
          + Registrar Negocio
        </Link>

      </div>

      {/* SEARCH */}
      <div className="mb-10">
        <input
          type="text"
          placeholder="Buscar negocios, ciudades o categorías..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 text-[#0F172A] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3F7FD8]"
        />
      </div>

      {/* CATEGORY FILTERS */}
      <div className="flex flex-wrap gap-3 mb-10">

        {[
          "Todos",
          "Restaurante",
          "Colmado",
          "Tienda",
          "Salón",
          "Barbería",
          "Taller Mecánico",
          "Farmacia",
          "Supermercado",
          "Hospital",
          "Clínica",
          "Ferretería",
          "Hotel",
          "Cafetería",
          "Pizzería",
          "Gym",
          "Dealer",
          "Lavado",
          "Repuestos",
          "Electrónica",
          "Banco",
          "Oficina Pública",
          "Delivery",
          "Discoteca",
        ].map((categoria) => (

          <button
            key={categoria}
            onClick={() => setCategoriaActiva(categoria)}
            className={`px-5 py-2 rounded-full border transition ${
              categoriaActiva === categoria
                ? "bg-[#3F7FD8] text-white border-[#3F7FD8]"
                : "bg-white text-gray-600 border-gray-200 hover:border-[#3F7FD8]"
            }`}
          >
            {categoria}
          </button>

        ))}

      </div>

      {/* RESULTS */}
      {negociosFiltrados.length === 0 ? (

        <div className="bg-white rounded-2xl p-10 text-center border border-gray-100">
          <p className="text-gray-500">
            No se encontraron negocios.
          </p>
        </div>

      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {negociosFiltrados.map((negocio) => {

            const promedio =
              negocio.reviews?.length > 0
                ? Number(
                    (
                      negocio.reviews.reduce(
                        (acc: number, review: any) =>
                          acc + review.calificacion,
                        0
                      ) / negocio.reviews.length
                    ).toFixed(1)
                  )
                : 0;

            return (
              <BusinessCard
                key={negocio.id}
                {...negocio}
                calificacion={promedio}
              />
            );
          })}

        </div>

      )}

    </main>
  );
}