import { Router } from "express";
import {
  listarClientes,
  buscarCliente,
  criarCliente,
  atualizarCliente,
  removerCliente,
} from "../controllers/clientes.controller.js";
import validarCliente from "../middlewares/validarCliente.js";

const router = Router();

router.get("/", listarClientes);
router.get("/:id", buscarCliente);

router.post("/", validarCliente, criarCliente);
router.put("/:id", validarCliente, atualizarCliente);

router.delete("/:id", removerCliente);

export default router;
