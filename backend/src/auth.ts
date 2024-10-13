import express, { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from './index';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Register a new user
// @ts-ignore
router.post('/register', async (req: Request, res: Response) => {
	const { name, email, password } = req.body;

	try {
		const existingUser = await prisma.user.findUnique({ where: { email } });
		if (existingUser) {
			return res.status(400).json({ message: 'Email already exists' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword
			}
		});

		res.status(201).json(newUser);
	} catch (error) {
		res.status(500).json({ message: 'Error creating user' });
	}
});

// Log in a user
// @ts-ignore
router.post('/login', async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
		res.json({ token });
	} catch (error) {
		res.status(500).json({ message: 'Error logging in' });
	}
});

export default router;

