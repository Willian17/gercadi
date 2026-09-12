import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { units } from "@/data/units";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/empresa", "/frota", "/nossas-unidades", "/express", "/seja-parceiro", "/24horas", "/coleta", "/fale-conosco", "/cotacao"];
  const pages: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/cotacao" ? 0.9 : 0.8,
  }));
  const unitPages: MetadataRoute.Sitemap = units.map((unit) => ({
    url: `${siteConfig.url}/unidades/${unit.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return [...pages, ...unitPages];
}
