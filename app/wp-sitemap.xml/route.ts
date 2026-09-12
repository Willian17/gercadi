import { siteConfig } from "@/data/site";
import { units } from "@/data/units";

export const dynamic = "force-static";

const routes = ["", "/empresa", "/frota", "/nossas-unidades", "/express", "/seja-parceiro", "/24horas", "/coleta", "/fale-conosco", "/cotacao"];

export function GET() {
  const urls = [
    ...routes.map((route) => `${siteConfig.url}${route}`),
    ...units.map((unit) => `${siteConfig.url}/unidades/${unit.slug}`),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}\n</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
}
