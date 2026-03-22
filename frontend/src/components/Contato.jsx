import React from "react";
import { gerarLinkWhatsApp } from "../utils/whatsapp";

export default function Contato({ telefone }) {
  const link = gerarLinkWhatsApp(telefone);

  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {telefone}
    </a>
  );
}
