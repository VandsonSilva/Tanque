import express from "express";
import cors from "cors";
import tanqueRoutes from "./routes/tanques.routes";
import transferenciaRoutes from "./routes/transferencia.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/tanques", tanqueRoutes);
app.use("/transferencias", transferenciaRoutes);

export default app;
