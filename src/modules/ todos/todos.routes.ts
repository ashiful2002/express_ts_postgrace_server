import express from "express";
import { todosController } from "./todos.controller";
const router = express.Router();

router.post("/", todosController.createTodos);
router.get("/", todosController.getTodos);
router.get("/:id", todosController.getSingleTodos);
router.put("/:id", todosController.updateSingleUser);
router.delete("/:id", todosController.deleteUser);

export const todosRoutes = router;
