import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, "data", "clientes.json");

const app = express();

app.use(cors());
app.use(express.json());

function lerClientes() {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
}

function salvarClientes(clientes) {
  fs.writeFileSync(dataPath, JSON.stringify(clientes, null, 2));
}

app.get("/", (req, res) => {
  res.json({ mensagem: "API rodando 🚀" });
});

app.get("/clientes", (req, res) => {
  const clientes = lerClientes();
  res.json(clientes);
});

app.get("/clientes/:id", (req, res) => {
  const clientes = lerClientes();
  const cliente = clientes.find((c) => c.id === Number(req.params.id));

  if (!cliente) {
    return res.status(404).json({ erro: "Cliente não encontrado" });
  }

  res.json(cliente);
});

app.post("/clientes", (req, res) => {
  const clientes = lerClientes();

  const novoCliente = {
    id: Date.now(),
    ...req.body,
    dataCadastro: new Date().toISOString(),
  };

  clientes.push(novoCliente);
  salvarClientes(clientes);

  res.status(201).json(novoCliente);
});

app.put("/clientes/:id", (req, res) => {
  const clientes = lerClientes();
  const index = clientes.findIndex((c) => c.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ erro: "Cliente não encontrado" });
  }

  clientes[index] = {
    ...clientes[index],
    ...req.body,
  };

  salvarClientes(clientes);

  res.json(clientes[index]);
});

app.delete("/clientes/:id", (req, res) => {
  const clientes = lerClientes();
  const novosClientes = clientes.filter((c) => c.id !== Number(req.params.id));

  salvarClientes(novosClientes);

  res.json({ mensagem: "Cliente removido" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
