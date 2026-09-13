export function createWhatsappUrl(phone: string, message: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function openWhatsapp(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}
