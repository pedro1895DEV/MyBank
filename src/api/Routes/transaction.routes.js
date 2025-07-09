import express from 'express';
import { transferValue } from '../Controllers/transaction.controller.js';

const router = express.Router();

router.post('/', transferValue);

export default router;