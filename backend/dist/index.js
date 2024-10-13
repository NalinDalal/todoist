"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth"));
const tasks_1 = __importDefault(require("./tasks"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
exports.default = prisma;
// Middleware
app.use(express_1.default.json());
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/tasks', tasks_1.default);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
});
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
/*process.on('SIGINT', async () => {
    console.log('Closing Prisma client...');
    await prisma.$disconnect();
    process.exit(0);
});*/
// Gracefully shutdown on termination signals
const gracefulShutdown = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Closing Prisma client...');
    yield prisma.$disconnect();
    console.log('Prisma client closed.');
    process.exit(0);
});
// Listen for termination signals
process.on('SIGINT', gracefulShutdown); // for Ctrl+C
process.on('SIGTERM', gracefulShutdown); // for other termination signals
