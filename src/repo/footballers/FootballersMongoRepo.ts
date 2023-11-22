import { Footballers } from '../../entities/footballers';
import { Repository } from '../repo';
import { HttpError } from '../../types/http.error.js';
import { FootballersModel } from './footballers.mongo.model.js';
import { UserMongoRepo } from '../users/user.mongo.repo';
import { debug } from './footballers.mongo.repo';

export class FootballersMongoRepo implements Repository<Footballers> {
  repoUser: UserMongoRepo; // Para poder hacer el create necesitamos ligar
  constructor() {
    this.repoUser = new UserMongoRepo();
    debug('Instatiated');
  }

  async getAll(): Promise<Footballers[]> {
    const data = await FootballersModel.find().exec();
    return data;
  }

  async getById(id: string): Promise<Footballers> {
    const result = await FootballersModel.findById(id).exec();
    if (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');
    return result;
  }

  // Adaptar este con el private save (sustituirlo por el fs.writefile)
  async create(newItem: Omit<Footballers, 'id'>): Promise<Footballers> {
    newItem.autor = await this.repoUser.getById(newItem.autor.id);

    const result: Footballers = await FootballersModel.create(newItem);
    return result;
  }

  async update(
    id: string,
    updatedItem: Partial<Footballers>
  ): Promise<Footballers> {
    const result = await FootballersModel.findByIdAndUpdate(id, updatedItem, {
      new: true,
    }).exec();
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    return result;
  }

  async delete(id: string): Promise<void> {
    const newfootballers = await FootballersModel.findByIdAndDelete(id).exec();

    if (!newfootballers) {
      throw new HttpError(404, 'Not found', 'It is not possible to delete');
    }
  }
}
