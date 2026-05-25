import BusinessCard from "../../components/BusinessCard";
import { prisma } from "@/lib/prisma";

export default async function BusinessesPage() {

  const negocios = await prisma.business.findMany({
  include: {
    reviews: true,
  },
  orderBy: {
    createdAt: "desc",
  },
});

  return (
    <main className="min-h-screen bg-gray-50 p-10">

      <div className="mb-10">
        <h1 className="text-4xl font-semibold text-[#0F172A] mb-3">
          Negocios Registrados
        </h1>

        <p className="text-gray-500">
          Descubre negocios, restaurantes y servicios evaluados por la comunidad.
        </p>
      </div>

      {negocios.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center border border-gray-100">
          <p className="text-gray-500">
            No hay negocios registrados todavía.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {negocios.map((negocio) => (
           <BusinessCard
  key={negocio.id}
  {...negocio}
  calificacion={
    negocio.reviews.length > 0
      ? Number(
          (
            negocio.reviews.reduce(
              (acc, review) => acc + review.calificacion,
              0
            ) / negocio.reviews.length
          ).toFixed(1)
        )
      : 0
  }
/>
          ))}
        </div>
      )}

    </main>
  );
}