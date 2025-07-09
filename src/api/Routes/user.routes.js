import  express  from 'express';
import { createUser, getAllUsers } from './../Controllers/user.controller.js';

const router = express.Router();

router.get('/all-users', getAllUsers);
router.post('/create-user', createUser);

export default router;