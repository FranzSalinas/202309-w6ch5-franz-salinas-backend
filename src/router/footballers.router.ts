import { Router as createRouter } from 'express';

import { FootballerController } from '../controller/footballers.controller.js';
import createDebug from 'debug';
import { FootballersMongoRepo } from '../repo/footballers/footballers.mongo.repo.js';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';
import { FileInterceptor } from '../middleware/file.interceptor.js';

const debug = createDebug('W7E:footballers:router');

export const footballersRouter = createRouter();
debug('Starting');

const repo = new FootballersMongoRepo();
const controller = new FootballerController(repo); // Inyección de dependenncias. Desacoplamos el controler de un repo concreto.
const interceptor = new AuthInterceptor();
const fileInterceptor = new FileInterceptor();

footballersRouter.get('/', controller.getAll.bind(controller));

footballersRouter.get('/:id', controller.getById.bind(controller));
footballersRouter.post(
  '/',
  interceptor.authorization.bind(interceptor),
  fileInterceptor.singleFileStore('imageFootballer').bind(fileInterceptor),
  controller.create.bind(controller)
);
footballersRouter.patch(
  '/:id',
  interceptor.authorization.bind(interceptor),
  interceptor.authentificationFootballers.bind(interceptor),
  controller.create.bind(controller)
);
footballersRouter.delete(
  '/:id',
  interceptor.authorization.bind(interceptor),
  interceptor.authentificationFootballers.bind(interceptor),
  controller.create.bind(controller)
);
