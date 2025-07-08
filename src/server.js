import  express  from 'express';
import { PrismaClient } from '@prisma/client';
import  userRoutes  from './api/Routes/user.routes.js';

const app = express();
const port = 3000;
const prisma = new PrismaClient();

app.use(express.json());
app.use('/api', userRoutes);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});