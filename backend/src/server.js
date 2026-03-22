import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import clientesRoutes from "./routes/clientes.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensagem: "API rodando 🚀" });
});

app.use("/clientes", clientesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
