import BusinessDetailClient from "@/app/businesses/[id]/BusinessDetailClient";

export default function BusinessDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <BusinessDetailClient params={params} />;
}