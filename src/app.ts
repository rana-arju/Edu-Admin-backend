import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import { notFound } from './app/middleware/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';
const app: Application = express();
//json parser
app.use(express.json());

// cors

app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));
app.use(cookieParser());

// application routes

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is Working...');
});

// Error-handling middleware
app.use(globalErrorHandler);
app.use(notFound);
export default app;
