import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ===============================
// GET - Obtener reseñas por negocio
// ===============================
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const businessIdParam = searchParams.get("businessId");

    if (!businessIdParam) {
      return NextResponse.json([], { status: 200 });
    }

    const businessId = Number(businessIdParam);

    if (isNaN(businessId)) {
      return NextResponse.json(
        { error: "ID inválido" },
        { status: 400 }
      );
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

// ===============================
// POST - Crear reseña
// ===============================
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const businessId = Number(body.businessId);
    const calificacion = Number(body.calificacion);

    // Validaciones básicas
    if (
      !body.usuario ||
      !body.comentario ||
      isNaN(businessId) ||
      isNaN(calificacion)
    ) {
      return NextResponse.json(
        { error: "Datos inválidos" },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {
        usuario: body.usuario,
        comentario: body.comentario,
        calificacion,
        businessId,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Error creando reseña" },
      { status: 500 }
    );
  }
}