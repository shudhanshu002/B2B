"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes")); // Module 1
const proposalRoutes_1 = __importDefault(require("./routes/proposalRoutes")); // Module 2
const impactRoutes_1 = __importDefault(require("./routes/impactRoutes")); // Module 3
const botRoutes_1 = __importDefault(require("./routes/botRoutes")); // Module 4
const app = (0, express_1.default)();
(0, db_1.default)();
const allowedOrigins = [
    process.env.FRONTEND_URL
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express_1.default.json());
app.use('/api/products', productRoutes_1.default); // Module 1 route
app.use('/api/proposals', proposalRoutes_1.default); // Module 2 route
app.use('/api/impact', impactRoutes_1.default); // Module 3 route
app.use('/api/webhook', botRoutes_1.default); // Module 4 route
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//# sourceMappingURL=index.js.map