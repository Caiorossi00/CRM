import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Sidebar.scss";

const Sidebar = () => {
  return (
    <div id="sidebar-container">
      <i class="fa-solid fa-scale-balanced"></i>

      <div className="btns-container">
        <div className="bar-btn">
          <i class="fa-solid fa-user"></i>
          <Link to="/clientes">
            <button>Clientes</button>
          </Link>
        </div>

        <div className="bar-btn">
          <i class="fa-regular fa-file"></i> <button>Ações</button>
        </div>

        <div className="bar-btn">
          <i class="fa-solid fa-wrench"></i> <button>Configurações</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
