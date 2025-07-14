import  express  from 'express';
import mainRouter from './api/Routes/index.js';
import { errorHandler } from './middlewares/errors.js';

const app = express();
app.use(express.json());

app.use('/api', mainRouter);
app.use(errorHandler);

export default app;