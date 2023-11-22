import { Router as createRouter } from 'express';

import { FootballerController } from '../controller/footballers.controller.js';
import createDebug from 'debug';
import { FootballersMongoRepo } from '../repo/footballers/FootballersMongoRepo.js';

const debug = createDebug('W7E:footballers:router');

export const Router = createRouter();
debug('Starting');

const repo = new FootballersMongoRepo();
const controller = new FootballerController(repo); // Inyección de dependenncias. Desacoplamos el controler de un repo concreto.

Router.get('/', controller.getAll.bind(controller));

Router.get('/:id', controller.getById.bind(controller));
Router.post('/', controller.create.bind(controller));
Router.patch('/:id', controller.update.bind(controller));
Router.delete('/:id', controller.delete.bind(controller));
