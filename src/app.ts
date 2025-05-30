import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import authenticationRoutes from "./routes/authentication";

const app = express();

app.use(morgan("combined"));
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/auth", authenticationRoutes);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({ error: err });
});
export default app;
