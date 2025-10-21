"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const tanques_routes_1 = __importDefault(require("./routes/tanques.routes"));
const transferencia_routes_1 = __importDefault(require("./routes/transferencia.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const abastecimento_routes_1 = __importDefault(require("./routes/abastecimento.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/auth", auth_routes_1.default);
app.use("/tanques", tanques_routes_1.default);
app.use("/transferencias", transferencia_routes_1.default);
app.use("/abastecimentos", abastecimento_routes_1.default);
exports.default = app;
