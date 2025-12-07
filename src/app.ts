import express, { Request, Response } from "express";
import config from "./config";
import { initDb } from "./config/db";
import { logger } from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { todosRoutes } from "./modules/ todos/todos.routes";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();
const port = config.port;
// middleware
app.use(express.json());
// db initialization
initDb();

app.get("/", logger, (req: Request, res: Response) => {
  res.send(`
    endpoints are: </br>
   <a href="/users"> /users</a> </br>
   <a href="/users/1"> /users/1</a> </br>
 ----------------------------------------------</br>
  <a href="/todos"> /todos</a></br>

    `);
});

app.use("/users", userRoutes);
app.use("/todos", todosRoutes);
app.use("/auth", authRoutes);

// not found route
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "route not found",
    path: req.path,
  });
});

export default app;
