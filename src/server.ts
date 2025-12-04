import express, { Request, Response } from "express";
import { Pool } from "pg";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const app = express();
const port = 5500;
// middleware
app.use(express.json());

// DB
const pool = new Pool({
  connectionString: `${process.env.CONNECTION_STR}`,
});

const initDb = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL, 
        age INT, 
        phone VARCHAR(15), 
        address TEXT,
        created_at TIMESTAMP DEFAULT NOW(), 
        updated_at TIMESTAMP DEFAULT NOW()
        )`);

  await pool.query(`
           CREATE TABLE IF NOT EXISTS todos(
           id SERIAL PRIMARY KEY,
           user_id INT REFERENCES users(id) ON DELETE CASCADE,
           title VARCHAR(200) NOT NULL,
           description TEXT,
           completed BOOLEAN DEFAULT false,
           due_date DATE,
           created_at TIMESTAMP DEFAULT NOW(),
           updated_at TIMESTAMP DEFAULT NOW()
           )`);
};

initDb();
app.get("/", (req: Request, res: Response) => {
  res.send("Hello next level world");
});

app.post("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.send("hello this is new post route");
});

app.listen(port, () => {
  console.log(`${"http://localhost:5500"} app listening on port ${port}`);
});
