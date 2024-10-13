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
//import { PrismaClient } from '@prisma/client';
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = __importDefault(require("./index"));
const router = express_1.default.Router();
//const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
// Middleware to authenticate users
const authenticate = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
// Get all tasks for the authenticated user
router.get('/', authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield index_1.default.task.findMany({ where: { userId: req.userId } });
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching tasks' });
    }
}));
// Add a new task
router.post('/', authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, dueDate, priority, status } = req.body;
    try {
        const newTask = yield index_1.default.task.create({
            //@ts-ignore
            data: {
                title,
                description,
                dueDate: dueDate ? new Date(dueDate) : null,
                priority,
                status,
                userId: req.userId
            }
        });
        res.status(201).json(newTask);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating task' });
    }
}));
// Update a task
router.put('/:id', authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, dueDate, priority, status } = req.body;
    try {
        const updatedTask = yield index_1.default.task.update({
            where: { id: Number(id), userId: req.userId },
            data: {
                title,
                description,
                dueDate: dueDate ? new Date(dueDate) : null,
                priority,
                status
            }
        });
        res.json(updatedTask);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating task' });
    }
}));
// Delete a task
router.delete('/:id', authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield index_1.default.task.delete({ where: { id: Number(id), userId: req.userId } });
        res.json({ message: 'Task deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting task' });
    }
}));
exports.default = router;
