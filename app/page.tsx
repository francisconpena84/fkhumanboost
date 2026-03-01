export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-[#0F172A] flex flex-col items-center justify-center px-6">

      <h1 className="text-4xl md:text-5xl font-semibold mb-6 text-center">
        Plataforma de Opiniones y Evaluaciones en la República Dominicana
      </h1>

      <p className="text-lg text-gray-600 max-w-2xl text-center mb-10 leading-relaxed">
        FKReview es un espacio formal y confiable donde ciudadanos pueden
        evaluar restaurantes, instituciones públicas, servicios profesionales
        y empresas, promoviendo la transparencia y la mejora continua.
      </p>

      <div className="flex gap-6">
        <button className="bg-[#3F7FD8] text-white px-8 py-3 rounded-md font-medium hover:opacity-90 transition">
          Ver Negocios
        </button>

        <button className="border border-[#0F172A] px-8 py-3 rounded-md font-medium hover:bg-[#0F172A] hover:text-white transition">
          Registrar Negocio
        </button>
      </div>

    </main>
  );
}