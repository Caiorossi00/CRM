import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatarData } from "../../../utils/dateUtils";
import Contato from "../../../components/Contato";
import "../../../assets/styles/ClienteRow.scss";

const TRATATIVAS = {
  Qualificação: "#00BCD4",
  Proposta: "#6d03d1",
  Contratacao: "#4d463a",
  "Fechado (advocacia)": "#246e1d",
  "Fechado (consultoria)": "#246e1d",
  "Oportunidade Perdida": "#f13a2d",
  "Encaminhado p/ Parceria": "#e7ce3f",
};

export default function ClienteRow({ cliente, onEditar, onExcluir }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickFora(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuAberto(false);
      }
    }
    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  const corTratativa = TRATATIVAS[cliente.resumoUltimaTratativa] || "#ccc";

  return (
    <tr>
      <td>
        <Link to={`/clientes/${cliente.id}`}>{cliente.nome}</Link>
      </td>
      <td>
        <Contato telefone={cliente.telefone} />
      </td>
      <td>{formatarData(cliente.ultimoContato)}</td>
      <td>{cliente.formaProspeccao}</td>
      <td>{cliente.areaAtuacao}</td>
      <td className="td-resumo">{cliente.resumoDemanda}</td>
      <td className="td-resumo">
        <span
          className="tratativa-destacada"
          style={{
            backgroundColor: corTratativa,
          }}
        >
          {cliente.resumoUltimaTratativa}
        </span>
      </td>
      <td className="td-resumo">{cliente.motivoNaoContratado}</td>
      <td className="acoes-cell">
        <div className="menu-wrapper" ref={menuRef}>
          <button
            className="btn-menu"
            onClick={() => setMenuAberto(!menuAberto)}
          >
            ···
          </button>
          {menuAberto && (
            <div className="menu-dropdown">
              <button onClick={() => onEditar(cliente)}>Editar</button>
              <button onClick={() => onExcluir(cliente.id)}>Excluir</button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}
