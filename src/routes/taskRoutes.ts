import { Router } from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/taskController';
import authenticateToken from '../middleware/authMiddleware'; // Import the authentication middleware
import validateTask from '../middleware/taskMiddleware'; // Import the task validation middleware

const router = Router();

router.post('/', authenticateToken, validateTask, createTask);
router.get('/', authenticateToken, getTasks);
router.put('/:id', authenticateToken, validateTask, updateTask);
router.delete('/:id', authenticateToken, deleteTask);

export default router;
