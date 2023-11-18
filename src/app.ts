import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { Router } from './router/router.js';

export const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.static('public'));

app.use('/footballers', Router);
