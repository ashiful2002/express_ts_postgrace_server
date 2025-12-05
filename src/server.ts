import express, { Request, Response } from "express";
import config from "./config";
import { initDb } from "./config/db";
import { logger } from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { todosRoutes } from "./modules/ todos/todos.routes";

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

// user relaetd paths
app.use("/users", userRoutes);
// todos related paths
app.use("/todos", todosRoutes);

// not found route
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "route not found",
    path: req.path,
  });
});
app.listen(port, () => {
  console.log(`${"http://localhost:5500"} app listening on port ${port}`);
});
