export default function Modal({ children, fechar }) {
  return (
    <div style={overlay}>
      <div style={content}>
        <button onClick={fechar}>X</button>
        {children}
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const content = {
  background: "#fff",
  padding: 20,
  borderRadius: 8,
  width: "90%",
  maxWidth: 400,
};
