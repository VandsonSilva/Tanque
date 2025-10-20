import express from "express";
import cors from "cors";
import tanqueRoutes from "./routes/tanques.routes";
import transferenciaRoutes from "./routes/transferencia.routes";
import authRoutes from "./routes/auth.routes";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tanques", tanqueRoutes);
app.use("/transferencias", transferenciaRoutes);

export default app;
