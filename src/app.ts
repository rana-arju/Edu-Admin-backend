import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import { notFound } from './app/middleware/notFound';
import router from './app/routes';

const app: Application = express();
//json parser
app.use(express.json());

// cors

app.use(cors());

// application routes

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is Working...');
});

// Error-handling middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(globalErrorHandler);
app.use(notFound);
export default app;
