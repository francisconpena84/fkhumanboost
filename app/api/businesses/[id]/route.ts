import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const businessId = Number(id);

    if (isNaN(businessId)) {
      return NextResponse.json(
        { error: "ID inválido" },
        { status: 400 }
      );
    }

    const business = await prisma.business.findUnique({
      where: { id: businessId },
    });

    if (!business) {
      return NextResponse.json(
        { error: "Negocio no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(business);
  } catch (error) {
    console.error("Error cargando negocio:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}