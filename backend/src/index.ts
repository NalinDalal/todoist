import express from 'express';
import authRoutes from './auth';
import taskRoutes from './tasks';
import { PrismaClient } from '@prisma/client';
const app = express();

const prisma = new PrismaClient();
export default prisma;
// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
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
const gracefulShutdown = async () => {
	console.log('Closing Prisma client...');
	await prisma.$disconnect();
	console.log('Prisma client closed.');
	process.exit(0);
};

// Listen for termination signals
process.on('SIGINT', gracefulShutdown); // for Ctrl+C
process.on('SIGTERM', gracefulShutdown); // for other termination signals


