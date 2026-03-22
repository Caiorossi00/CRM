import { gerarLinkWhatsApp } from "../utils/whatsapp";
import "../assets/styles/ClienteRow.scss";

export default function Contato({ telefone }) {
  const link = gerarLinkWhatsApp(telefone);

  return (
    <a
      className="telefone"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      {telefone}
    </a>
  );
}
