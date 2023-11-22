import createDebug from 'debug';
import { Repository } from '../repo/repo.js';
import { User } from '../entities/user.js';
import { NextFunction, Request, Response } from 'express';
import { UserMongoRepo } from '../repo/users/user.mongo.repo.js';

const debug = createDebug('w7E:user:controller');

export class UserController {
  // eslint-disable-next-line no-unused-vars
  constructor(private repo: Repository<UserMongoRepo>) {
    // Inyección de dependenncias. Desacoplamos el controler de un repo concreto.
    debug('Instatiated');
  }

  async login(req: Request, res: Response, next: NextFunction){
    try { 
      const result = await this.repo.
      
    } catch (error) {
      
    }
   
  }

  async getAll(): Promise<User[]> {
    const result = await UserModel.find().exec();
    return result;
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.repo.create(req.body);
      res.status(201);
      res.statusMessage = 'Created';
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
