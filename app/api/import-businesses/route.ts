import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {

  try {

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    const query =
      "restaurants in Santo Domingo Dominican Republic";

    const url =
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`;

    const response = await fetch(url);

    const data = await response.json();

    if (!data.results) {
      return NextResponse.json(
        { error: "No businesses found" },
        { status: 400 }
      );
    }

    let imported = 0;

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
            categoria: "Restaurante",
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

    return NextResponse.json({
      success: true,
      imported,
      total: data.results.length,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Import failed" },
      { status: 500 }
    );
  }
}