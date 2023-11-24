import createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../types/http.error.js';
import { Auth } from '../services/auth.js';
import { FootballersMongoRepo } from '../repo/footballers/footballers.mongo.repo.js';

const debug = createDebug('W7E:auth:interceptor');

export class AuthInterceptor {
  constructor() {
    debug('Instantiated');
  }

  authorization(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenHeader = req.get('Authorization');
      if (!tokenHeader?.startsWith('Bearer'))
        throw new HttpError(401, 'Unauthorized');
      const token = tokenHeader.split(' ')[1];

      const tokenPayload = Auth.verifyAndGetPayload(token);
      req.body.userId = tokenPayload.id;
      next();
    } catch (error) {
      next(error);
    }
  }

  async authentificationFootballers(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      // eslint-disable-next-line prefer-destructuring
      const userId = req.body.userId;
      const footballersId = req.params.id;
      const repo = new FootballersMongoRepo();
      const footballers = await repo.getById(footballersId);
      if (footballers.autor.id !== userId)
        throw new HttpError(401, 'Unauthorized', 'User not valid');
      next();
    } catch (error) {
      next(error);
    }
  }
}
