import BusinessCard from "../../components/BusinessCard";

export default function BusinessesPage() {
  const negocios = [
  {
    id: 1,
    nombre: "Restaurante El Buen Sabor",
    categoria: "Restaurante",
    ciudad: "Santo Domingo",
    direccion: "Av. Winston Churchill #123",
    telefono: "+1 809-555-1234",
    website: "www.elbuensabor.com",
    calificacion: 4.5,
  },
  {
    id: 2,
    nombre: "Hospital Central RD",
    categoria: "Institución Pública",
    ciudad: "Santiago",
    direccion: "Calle Principal #45",
    telefono: "+1 809-555-9876",
    website: "www.hospitalcentralrd.gob.do",
    calificacion: 3.8,
  },
  {
    id: 3,
    nombre: "Auto Servicio Premium",
    categoria: "Taller Mecánico",
    ciudad: "Punta Cana",
    direccion: "Av. Barceló Km 5",
    telefono: "+1 809-555-4567",
    website: "www.autoserviciopremium.com",
    calificacion: 4.2,
  },
];
  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-semibold text-[#0F172A] mb-8">
        Negocios Registrados
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {negocios.map((negocio) => (
          <BusinessCard key={negocio.id} {...negocio} />
        ))}
      </div>
    </main>
  );
}