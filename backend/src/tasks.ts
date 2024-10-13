import express from 'express';
//import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import prisma from './index';

const router = express.Router();
//const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to authenticate users
const authenticate = (req: any, res: any, next: any) => {
	const token = req.header('Authorization')?.replace('Bearer ', '');
	if (!token) {
		return res.status(401).json({ message: 'Authentication required' });
	}

	try {
		const decoded: any = jwt.verify(token, JWT_SECRET);
		req.userId = decoded.userId;
		next();
	} catch (error) {
		return res.status(401).json({ message: 'Invalid token' });
	}
};

// Get all tasks for the authenticated user
router.get('/', authenticate, async (req, res) => {
	try {
		const tasks = await prisma.task.findMany({ where: { userId: req.userId } });
		res.json(tasks);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching tasks' });
	}
});

// Add a new task
router.post('/', authenticate, async (req, res) => {
	const { title, description, dueDate, priority, status } = req.body;

	try {
		const newTask = await prisma.task.create({
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
	} catch (error) {
		res.status(500).json({ message: 'Error creating task' });
	}
});

// Update a task
router.put('/:id', authenticate, async (req, res) => {
	const { id } = req.params;
	const { title, description, dueDate, priority, status } = req.body;

	try {
		const updatedTask = await prisma.task.update({
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
	} catch (error) {
		res.status(500).json({ message: 'Error updating task' });
	}
});

// Delete a task
router.delete('/:id', authenticate, async (req, res) => {
	const { id } = req.params;

	try {
		await prisma.task.delete({ where: { id: Number(id), userId: req.userId } });
		res.json({ message: 'Task deleted' });
	} catch (error) {
		res.status(500).json({ message: 'Error deleting task' });
	}
});

export default router;

