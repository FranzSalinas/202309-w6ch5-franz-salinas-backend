import { NextFunction, Request, Response } from 'express';

import createDebug from 'debug';
import { Repository } from '../repo/repo.js';
import { Footballers } from '../entities/footballers.js';
import { Controller } from './controller.js';

const debug = createDebug('W7E:footballers:controller');

export class FootballerController extends Controller<Footballers> {
  constructor(protected repo: Repository<Footballers>) {
    super(repo);

    // Inyección de dependenncias. Desacoplamos el controler de un repo concreto.
    debug('Instatiated');
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.autor = { id: req.body.userId };
      super.create(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}
