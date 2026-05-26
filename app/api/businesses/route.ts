import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET businesses
export async function GET() {
  try {
    const businesses = await prisma.business.findMany({
  include: {
    reviews: true,
  },
  orderBy: {
    createdAt: "desc",
  },
});

    return NextResponse.json(businesses);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error cargando negocios" },
      { status: 500 }
    );
  }
}

// CREATE business
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const business = await prisma.business.create({
      data: {
        nombre: body.nombre,
        categoria: body.categoria,
        ciudad: body.ciudad,
        direccion: body.direccion,
        telefono: body.telefono,
        website: body.website,
      },
    });

    return NextResponse.json(business);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error creando negocio" },
      { status: 500 }
    );
  }
}