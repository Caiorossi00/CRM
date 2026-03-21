import "../assets/styles/Modal.scss";

export default function Modal({ children, fechar }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-fechar" onClick={fechar}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
