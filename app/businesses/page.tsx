import { Suspense } from "react";
import BusinessesClient from "./BusinessesClient";

export default function BusinessesPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <BusinessesClient />
    </Suspense>
  );
}