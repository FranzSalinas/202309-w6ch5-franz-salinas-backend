import { Router as createRouter } from 'express';

import { FootballerController } from '../controller/footballers.controller.js';
import createDebug from 'debug';
import { FootballersMongoRepo } from '../repo/footballers/footballers.mongo.repo.js';

const debug = createDebug('W7E:footballers:router');

export const footballersRouter = createRouter();
debug('Starting');

const repo = new FootballersMongoRepo();
const controller = new FootballerController(repo); // Inyección de dependenncias. Desacoplamos el controler de un repo concreto.

footballersRouter.get('/', controller.getAll.bind(controller));

footballersRouter.get('/:id', controller.getById.bind(controller));
footballersRouter.post('/', controller.create.bind(controller));
footballersRouter.patch('/:id', controller.update.bind(controller));
footballersRouter.delete('/:id', controller.delete.bind(controller));
