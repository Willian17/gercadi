export type Unit = {
  slug: string;
  name: string;
  phones: string[];
  whatsapp: string;
  email: string;
  hours?: string;
};

export const units: Unit[] = [
  { slug: "alta-floresta", name: "Alta Floresta", phones: ["(66) 99292-6555"], whatsapp: "5566992926555", email: "altafloresta@gercadi.com.br", hours: "06h às 18h" },
  { slug: "barra-do-bugres", name: "Barra do Bugres", phones: ["(65) 99290-6010"], whatsapp: "5565992906010", email: "barradobugres@gercadi.com.br", hours: "06h às 18h" },
  { slug: "caceres", name: "Cáceres", phones: ["(65) 99668-8659"], whatsapp: "5565996688659", email: "caceres@gercadi.com.br", hours: "06h às 18h" },
  { slug: "campo-novo-do-parecis", name: "Campo Novo do Parecis", phones: ["(65) 99973-5009", "(65) 99255-4052"], whatsapp: "5565999735009", email: "camponovo@gercadi.com.br", hours: "06h às 18h" },
  { slug: "campo-verde", name: "Campo Verde", phones: ["(65) 99227-8032", "(65) 99620-6445"], whatsapp: "5565992278032", email: "adm.campoverde@gercadi.com", hours: "06h às 18h" },
  { slug: "colider", name: "Colíder", phones: ["(65) 99358-7874", "(65) 99668-8987", "(65) 99231-5362"], whatsapp: "5565993587874", email: "colider@gercadi.com.br", hours: "06h às 18h" },
  { slug: "cuiaba", name: "Cuiabá — Matriz", phones: ["(65) 99620-5320", "(65) 99668-8007"], whatsapp: "5565996205320", email: "comercial@gercadi.com.br", hours: "24 horas" },
  { slug: "diamantino", name: "Diamantino", phones: ["(65) 99921-5436", "(65) 99332-7718"], whatsapp: "5565999215436", email: "diamantino@gercadi.com.br", hours: "06h às 18h" },
  { slug: "guaranta-do-norte", name: "Guarantã do Norte", phones: ["(66) 99205-0039"], whatsapp: "5566992050039", email: "guarantadonorte@gercadi.com.br", hours: "06h às 18h" },
  { slug: "jaciara", name: "Jaciara", phones: ["(66) 3461-5148", "(65) 99358-6999"], whatsapp: "5565993586999", email: "jaciara@gercadi.com.br", hours: "06h às 18h" },
  { slug: "juara", name: "Juara", phones: ["(65) 99358-7874", "(65) 99668-8987", "(65) 99231-5362"], whatsapp: "5565993587874", email: "transtorrestransportes@hotmail.com", hours: "06h às 18h" },
  { slug: "lucas-do-rio-verde", name: "Lucas do Rio Verde", phones: ["(65) 99668-8004", "(65) 99668-8293"], whatsapp: "5565996688004", email: "lucas@gercadi.com.br", hours: "06h às 18h" },
  { slug: "mirassol-d-oeste", name: "Mirassol d’Oeste", phones: ["(65) 99668-8705", "(65) 99644-8774"], whatsapp: "5565996688705", email: "mirassol@gercadi.com.br", hours: "06h às 18h" },
  { slug: "nova-mutum", name: "Nova Mutum", phones: ["(65) 3308-2289", "(65) 99668-8425", "(65) 99668-8935"], whatsapp: "5565996688425", email: "novamutum@gercadi.com.br", hours: "06h às 18h" },
  { slug: "peixoto-de-azevedo", name: "Peixoto de Azevedo", phones: ["(65) 99229-2256"], whatsapp: "5565992292256", email: "peixoto@gercadi.com.br", hours: "06h às 18h" },
  { slug: "pontes-e-lacerda", name: "Pontes e Lacerda", phones: ["(65) 99358-7874", "(65) 99668-8987", "(65) 99231-5362"], whatsapp: "5565993587874", email: "ponteslacerda@gercadi.com.br", hours: "06h às 18h" },
  { slug: "primavera-do-leste", name: "Primavera do Leste", phones: ["(65) 99236-1580", "(65) 99698-0324", "(65) 99221-8309"], whatsapp: "5565992361580", email: "primavera@gercadi.com.br", hours: "06h às 18h" },
  { slug: "rondonopolis", name: "Rondonópolis", phones: ["(66) 99712-1672", "(66) 99643-0741"], whatsapp: "5566997121672", email: "adm.roo@gercadi.com.br", hours: "06h às 18h" },
  { slug: "sapezal", name: "Sapezal", phones: ["(65) 3383-2169", "(65) 99929-0624"], whatsapp: "5565999290624", email: "sapezal@gercadi.com.br", hours: "06h às 18h" },
  { slug: "sinop", name: "Sinop", phones: ["(65) 99358-7874", "(65) 99668-8987", "(65) 99231-5362"], whatsapp: "5565993587874", email: "adm.sinop@gercadi.com.br", hours: "06h às 18h" },
  { slug: "sorriso", name: "Sorriso", phones: ["(65) 99329-6200", "(65) 99935-4711"], whatsapp: "5565993296200", email: "sorriso@gercadi.com.br", hours: "06h às 18h" },
  { slug: "tangara-da-serra", name: "Tangará da Serra", phones: ["(65) 99668-8770", "(65) 99668-8718"], whatsapp: "5565996688770", email: "tangara@gercadi.com.br", hours: "06h às 18h" },
  { slug: "terra-nova-do-norte", name: "Terra Nova do Norte", phones: ["(65) 99222-1162"], whatsapp: "5565992221162", email: "terranova@gercadi.com.br" },
];

export function getUnit(slug: string) {
  return units.find((unit) => unit.slug === slug);
}

export function phoneToHref(phone: string) {
  return `tel:+55${phone.replace(/\D/g, "")}`;
}
