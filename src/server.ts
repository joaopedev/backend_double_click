import express, { json, Response, NextFunction, Request } from "express";
import cors from "cors";

const consign = require("consign");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(json());

consign({ cwd: __dirname }).include("routers").into(app);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  // Set HTTP Status Code
  res.status(error.status);
  // Send response
  res.json({ message: error.message });
});

const server = app.listen(Number(process.env.PORT), () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
