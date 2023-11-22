import { Router as createRouter } from 'express';

import { UserController } from '../controller/user.controller.js';
import createDebug from 'debug';
import { UserMongoRepo } from '../repo/users/user.mongo.repo.js';

const debug = createDebug('W7E:user:router');

export const Router = createRouter();
debug('Starting');

const repo = new UserMongoRepo();
const controller = new UserController(repo); // Inyección de dependenncias. Desacoplamos el controler de un repo concreto.

Router.get('/', controller.getAll.bind(controller));

Router.post('/register', controller.create.bind(controller));
Router.post('/login', controller.create.bind(controller));
