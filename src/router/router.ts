import { Router as createRouter } from 'express';
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from '../controller/controller.js';

export const Router = createRouter();

Router.get('/', getAll);

Router.get('/:id', getById);
Router.post('/', create);
Router.patch('/:id', update);
Router.delete('/:id', remove);
