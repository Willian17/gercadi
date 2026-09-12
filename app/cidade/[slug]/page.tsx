import { StaticRedirect } from "@/components/static-redirect";
import { units } from "@/data/units";

export function generateStaticParams() {
  return units.map((unit) => ({ slug: unit.slug }));
}

export const dynamicParams = false;

export default async function CityRedirectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return <StaticRedirect destination={`/unidades/${slug}`} />;
}
