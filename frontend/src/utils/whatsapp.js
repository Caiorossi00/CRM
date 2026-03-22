export function gerarLinkWhatsApp(telefone) {
  const numeroLimpo = telefone.replace(/\D/g, "");

  return `https://wa.me/${numeroLimpo}`;
}
