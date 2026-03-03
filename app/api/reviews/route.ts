import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - obtener reseñas
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const businessId = Number(searchParams.get("businessId"));

    if (!businessId) {
      return NextResponse.json([], { status: 200 });
    }

    const reviews = await prisma.review.findMany({
      where: { businessId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Error obteniendo reseñas" },
      { status: 500 }
    );
  }
}

// POST - crear reseña
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const review = await prisma.review.create({
      data: {
        usuario: body.usuario,
        comentario: body.comentario,
        calificacion: body.calificacion,
        businessId: body.businessId,
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Error creando reseña" },
      { status: 500 }
    );
  }
}