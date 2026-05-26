import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {

  try {

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    const queries = [
      "restaurants in Santo Domingo Dominican Republic",
      "hotels in Santo Domingo Dominican Republic",
      "gyms in Santo Domingo Dominican Republic",
      "pharmacies in Santo Domingo Dominican Republic",
      "cafes in Santo Domingo Dominican Republic",
    ];

    let imported = 0;

    for (const query of queries) {

      const url =
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`;

      const response = await fetch(url);

      const data = await response.json();

      if (!data.results) continue;

      for (const place of data.results) {

        const existe = await prisma.business.findFirst({
          where: {
            nombre: place.name,
          },
        });

        if (!existe) {

          await prisma.business.create({
            data: {

              nombre: place.name,

              categoria:
                place.types?.includes("restaurant")
                  ? "Restaurante"
                  : place.types?.includes("cafe")
                  ? "Cafetería"
                  : place.types?.includes("bar")
                  ? "Bar"
                  : place.types?.includes("bakery")
                  ? "Panadería"
                  : place.types?.includes("gym")
                  ? "Gym"
                  : place.types?.includes("pharmacy")
                  ? "Farmacia"
                  : place.types?.includes("hospital")
                  ? "Hospital"
                  : place.types?.includes("lodging")
                  ? "Hotel"
                  : place.types?.includes("shopping_mall")
                  ? "Tienda"
                  : "Negocio",

              ciudad: "Santo Domingo",
              direccion: place.formatted_address || "",
              telefono: "",
              website: "",
              googleRating: place.rating || 0,
              googleReviews: place.user_ratings_total || 0,
              googlePlaceId: place.place_id || "",
              photoReference:
                place.photos?.[0]?.photo_reference ||
                place.photos?.[0]?.name ||
                "",
            },
          });

          imported++;
        }
      }
    }

    return NextResponse.json({
      success: true,
      imported,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Import failed" },
      { status: 500 }
    );
  }
}