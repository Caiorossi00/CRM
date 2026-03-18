import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Sidebar.scss";

const Sidebar = () => {
  return (
    <div id="sidebar-container">
      <h1>Logo</h1>

      <div className="bar-btn">
        <p>I</p>
        <Link to="/clientes">
          <button>Clientes</button>
        </Link>
      </div>

      <div className="bar-btn">
        <p>I</p>
        <button>Ações</button>
      </div>

      <div className="bar-btn">
        <p>I</p>
        <button>Configurações</button>
      </div>
    </div>
  );
};

export default Sidebar;
