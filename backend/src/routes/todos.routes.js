import { Router } from "express";
import { getAllTodosCtrl, createTodoCtrl, uptateTodoCtrl, deleteTodoCtrl } from "../controllers/todos.controllers.js";
import {validarJwt} from "../middlewares/validar-jwt.js";

const todosRouter = Router();

todosRouter.get("/",validarJwt, getAllTodosCtrl);
todosRouter.post("/post",validarJwt, createTodoCtrl);
todosRouter.patch("/put/:id",validarJwt, uptateTodoCtrl);
todosRouter.delete("/delete/:id",validarJwt,deleteTodoCtrl);

export { todosRouter };
