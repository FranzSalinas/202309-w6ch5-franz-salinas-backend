import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { Router } from './router/router.js';
import createDebug from 'debug';

const debug = createDebug('w7E:footballers:app');

export const app = express();
debug('Starting');

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.static('public'));

app.use('/footballers', Router);

app.use((_error: Error, _req: Request, _res: Response, _next: NextFunction) => {
  debug('Middleware Erros');
});
