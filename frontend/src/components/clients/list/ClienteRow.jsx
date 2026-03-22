import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { formatarData } from "../../../utils/dateUtils";

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

  return (
    <tr>
      <td>
        <Link to={`/clientes/${cliente.id}`}>{cliente.nome}</Link>
      </td>
      <td>{cliente.telefone}</td>
      <td>{formatarData(cliente.ultimoContato)}</td>
      <td>{cliente.formaProspeccao}</td>
      <td>{cliente.areaAtuacao}</td>
      <td className="td-resumo">{cliente.resumoDemanda}</td>
      <td className="td-resumo">{cliente.resumoUltimaTratativa}</td>
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
