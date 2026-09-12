import { writeFile } from "node:fs/promises";

const coverageUrl = "https://docs.google.com/spreadsheets/d/1Q2SoU5FT-FvA7NIdn4lVekQ7_stHdG4zDHPzWBcm_so/export?format=csv&gid=1600510089";
const geometryUrl = "https://servicodados.ibge.gov.br/api/v3/malhas/estados/51?formato=application/vnd.geo%2Bjson&qualidade=minima&intrarregiao=municipio";
const municipalitiesUrl = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/51/municipios";

const unitNames = new Map([
  ["alta floresta", { name: "Alta Floresta", slug: "alta-floresta" }],
  ["barra do bugres", { name: "Barra do Bugres", slug: "barra-do-bugres" }],
  ["caceres", { name: "Cáceres", slug: "caceres" }],
  ["campo novo do parecis", { name: "Campo Novo do Parecis", slug: "campo-novo-do-parecis" }],
  ["campo verde", { name: "Campo Verde", slug: "campo-verde" }],
  ["colider", { name: "Colíder", slug: "colider" }],
  ["cuiaba", { name: "Cuiabá — Matriz", slug: "cuiaba" }],
  ["diamantino", { name: "Diamantino", slug: "diamantino" }],
  ["guaranta do norte", { name: "Guarantã do Norte", slug: "guaranta-do-norte" }],
  ["jaciara", { name: "Jaciara", slug: "jaciara" }],
  ["juara", { name: "Juara", slug: "juara" }],
  ["lucas do rio verde", { name: "Lucas do Rio Verde", slug: "lucas-do-rio-verde" }],
  ["mirassol d oeste", { name: "Mirassol d’Oeste", slug: "mirassol-d-oeste" }],
  ["nova mutum", { name: "Nova Mutum", slug: "nova-mutum" }],
  ["peixoto de azevedo", { name: "Peixoto de Azevedo", slug: "peixoto-de-azevedo" }],
  ["pontes e lacerda", { name: "Pontes e Lacerda", slug: "pontes-e-lacerda" }],
  ["primavera do leste", { name: "Primavera do Leste", slug: "primavera-do-leste" }],
  ["rondonopolis", { name: "Rondonópolis", slug: "rondonopolis" }],
  ["sapezal", { name: "Sapezal", slug: "sapezal" }],
  ["sinop", { name: "Sinop", slug: "sinop" }],
  ["sorriso", { name: "Sorriso", slug: "sorriso" }],
  ["tangara da serra", { name: "Tangará da Serra", slug: "tangara-da-serra" }],
  ["terra nova do norte", { name: "Terra Nova do Norte", slug: "terra-nova-do-norte" }],
]);

function normalize(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’`.-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function slugify(value) {
  return normalize(value).replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function flattenCoordinates(geometry) {
  if (geometry.type === "Polygon") return geometry.coordinates.flat();
  if (geometry.type === "MultiPolygon") return geometry.coordinates.flat(2);
  return [];
}

function pathFromGeometry(geometry, project) {
  const polygons = geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;
  return polygons.map((polygon) => polygon.map((ring) => ring.map(([lon, lat], index) => `${index ? "L" : "M"}${project(lon, lat).join(" ")}`).join("") + "Z").join("")).join("");
}

function centroidFromGeometry(geometry, project) {
  const points = flattenCoordinates(geometry);
  const [sumLon, sumLat] = points.reduce(([lon, lat], [pointLon, pointLat]) => [lon + pointLon, lat + pointLat], [0, 0]);
  return project(sumLon / points.length, sumLat / points.length);
}

function parseRows(csv) {
  return csv.split(/\r?\n/).slice(2).map((line) => {
    const [city = "", schedule = "", phone = "", sigla = "", email = ""] = line.split(",");
    return { city: city.trim(), schedule: schedule.trim(), phone: phone.trim(), sigla: sigla.trim(), email: email.trim() };
  });
}

const [csv, geometry, municipalities] = await Promise.all([
  fetch(coverageUrl).then((response) => response.text()),
  fetch(geometryUrl).then((response) => response.json()),
  fetch(municipalitiesUrl).then((response) => response.json()),
]);

const municipalityByName = new Map(municipalities.map((municipality) => [normalize(municipality.nome), municipality.id]));
const geometryByCode = new Map(geometry.features.map((feature) => [feature.properties.codarea, feature.geometry]));
const allPoints = geometry.features.flatMap((feature) => flattenCoordinates(feature.geometry));
const longitudes = allPoints.map(([longitude]) => longitude);
const latitudes = allPoints.map(([, latitude]) => latitude);
const bounds = { minLon: Math.min(...longitudes), maxLon: Math.max(...longitudes), minLat: Math.min(...latitudes), maxLat: Math.max(...latitudes) };
const width = 1000;
const height = 1100;
const padding = 38;
const project = (longitude, latitude) => [
  Number((padding + ((longitude - bounds.minLon) / (bounds.maxLon - bounds.minLon)) * (width - padding * 2)).toFixed(2)),
  Number((height - padding - ((latitude - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * (height - padding * 2)).toFixed(2)),
];

const mapPaths = geometry.features.map((feature) => ({
  code: feature.properties.codarea,
  d: pathFromGeometry(feature.geometry, project),
}));

let activeHub;
let activeRegion;
const usedSlugs = new Map();
const locations = [];

for (const row of parseRows(csv)) {
  if (!row.city) continue;
  const key = normalize(row.city);
  const unit = unitNames.get(key);
  const isHeading = !unit && !row.schedule && !row.phone && !row.email;
  if (isHeading) {
    activeRegion = row.city;
    activeHub = undefined;
    continue;
  }

  if (unit) {
    activeHub = unit;
    activeRegion = undefined;
  }

  const baseSlug = slugify(unit?.name ?? row.city);
  const occurrence = (usedSlugs.get(baseSlug) ?? 0) + 1;
  usedSlugs.set(baseSlug, occurrence);
  const municipalityCode = municipalityByName.get(key);
  const feature = municipalityCode ? geometryByCode.get(String(municipalityCode)) : undefined;
  const [x, y] = feature ? centroidFromGeometry(feature, project) : [];

  locations.push({
    id: occurrence === 1 ? baseSlug : `${baseSlug}-${occurrence}`,
    slug: unit?.slug,
    name: unit?.name ?? row.city,
    kind: unit ? "unit" : "served",
    schedule: unit?.slug === "cuiaba" ? "DIÁRIO" : row.schedule || undefined,
    region: activeRegion,
    hubName: unit ? undefined : activeHub?.name,
    hubSlug: unit ? undefined : activeHub?.slug,
    phones: row.phone ? [row.phone] : undefined,
    email: row.email || undefined,
    x,
    y,
    municipalityCode,
  });
}

const output = `/* This file is generated by scripts/generate-mt-map.mjs. Do not edit manually. */\n\nexport type CoverageKind = "unit" | "served";\n\nexport type CoverageLocation = {\n  id: string;\n  slug?: string;\n  name: string;\n  kind: CoverageKind;\n  schedule?: string;\n  region?: string;\n  hubName?: string;\n  hubSlug?: string;\n  phones?: string[];\n  email?: string;\n  x?: number;\n  y?: number;\n  municipalityCode?: number;\n};\n\nexport const mapViewBox = "0 0 ${width} ${height}";\n\nexport const mtMunicipalityPaths = ${JSON.stringify(mapPaths)} as const;\n\nexport const coverageLocations: CoverageLocation[] = ${JSON.stringify(locations)};\n`;

await writeFile(new URL("../data/coverage-map.ts", import.meta.url), output);
console.log(`Generated ${locations.length} coverage locations and ${mapPaths.length} municipal paths.`);
