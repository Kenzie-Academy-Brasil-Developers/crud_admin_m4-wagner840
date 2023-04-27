import express, { Application, json } from "express";
import "express-async-errors";
import userRoutes from "./routes/users.routes";
import loginRouter from "./routes/login.routes";
import { handleErrors } from "./error";

const app: Application = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("login", loginRouter);

app.use(handleErrors);

export default app;
