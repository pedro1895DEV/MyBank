import express from 'express';
import userRoutes from './user.routes.js';
import transacionRoutes from './transaction.routes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/transactions', transacionRoutes);

export default router;