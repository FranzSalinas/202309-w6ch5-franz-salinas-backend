import { Router as createRouter } from 'express';

import { FootballerController } from '../controller/controller.js';
import createDebug from 'debug';

const debug = createDebug('w7E:footballers:router');

export const Router = createRouter();
debug('Starting');

const controller = new FootballerController();

Router.get('/', controller.getAll.bind(controller));

Router.get('/:id', controller.getById.bind(controller));
Router.post('/', controller.create.bind(controller));
Router.patch('/:id', controller.update.bind(controller));
Router.delete('/:id', controller.delete.bind(controller));
