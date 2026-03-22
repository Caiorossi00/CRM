import { Router } from "express";
import {
  listarClientes,
  buscarCliente,
  criarCliente,
  atualizarCliente,
  removerCliente,
} from "../controllers/clientes.controller.js";

const router = Router();

router.get("/", listarClientes);
router.get("/:id", buscarCliente);
router.post("/", criarCliente);
router.put("/:id", atualizarCliente);
router.delete("/:id", removerCliente);

export default router;
