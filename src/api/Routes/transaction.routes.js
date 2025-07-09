import express from 'express';
import { transferValue, allTransfers } from '../Controllers/transaction.controller.js';

const router = express.Router();

router.post('/', transferValue);
router.get('/', allTransfers);

export default router;