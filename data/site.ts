export const siteConfig = {
  name: "Gercadi Transportes e Logística",
  shortName: "Gercadi",
  url: "https://gercadi.com.br",
  phone: "(65) 3667-4700",
  phoneHref: "tel:+556536674700",
  email: "comercial@gercadi.com.br",
  quoteWhatsapp: "5566997121672",
  collectionWhatsapp: "5565996123743",
  trackingUrl: "https://ssw.inf.br/2/rastreamento",
  coverageSheetUrl:
    "https://docs.google.com/spreadsheets/d/1Q2SoU5FT-FvA7NIdn4lVekQ7_stHdG4zDHPzWBcm_so/edit?gid=1600510089#gid=1600510089",
  facebook: "https://www.facebook.com/gercadi.transporte",
  instagram: "https://www.instagram.com/gercaditransportes/",
} as const;

export const mainNavigation = [
  { label: "Empresa", href: "/empresa" },
  { label: "Frota", href: "/frota" },
  { label: "Unidades", href: "/nossas-unidades" },
  { label: "Express", href: "/express" },
  { label: "24 Horas", href: "/24horas" },
  { label: "Coleta", href: "/coleta" },
  { label: "Fale Conosco", href: "/fale-conosco" },
  { label: "Seja Parceiro", href: "/seja-parceiro" },
] as const;

export const serviceNavigation = [
  { label: "Express", href: "/express" },
  { label: "24 Horas", href: "/24horas" },
  { label: "Coleta", href: "/coleta" },
] as const;

export const services = [
  {
    title: "Carga fracionada",
    description:
      "Controle, agilidade e segurança para transportar volumes de diferentes portes com acompanhamento de coleta e entrega.",
    href: "/frota",
  },
  {
    title: "Gercadi Express",
    description:
      "Solução para demandas urgentes, com rotas otimizadas e acompanhamento do transporte.",
    href: "/express",
  },
  {
    title: "Coleta",
    description:
      "Solicite coletas expressas, programadas ou especiais diretamente com nossa equipe.",
    href: "/coleta",
  },
  {
    title: "Atendimento 24 horas",
    description:
      "Um canal direto para necessidades urgentes de transporte, todos os dias da semana.",
    href: "/24horas",
  },
] as const;
