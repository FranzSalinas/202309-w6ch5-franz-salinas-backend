import { Footballers } from '../../entities/footballers';
import { Repository } from '../repo';
import { HttpError } from '../../types/http.error.js';
import createDebug from 'debug';
import { FootballersModel } from './footballers.mongo.model.js';
import { UserMongoRepo } from '../users/user.mongo.repo';

const debug = createDebug('W7E:footballers:mongo:repo');

export class FootballersMongoRepo implements Repository<Footballers> {
  repoUser: UserMongoRepo; // Para poder hacer el create necesitamos ligar
  constructor() {
    this.repoUser = new UserMongoRepo();
    debug('Instatiated');
  }

  async getAll(): Promise<Footballers[]> {
    const data = await FootballersModel.find()
      .populate('autor', { footballers: 0 })
      .exec(); //  Si hacemos await FootballersModel.find().populate('autor', {age:0}).exec(); NO nos mostraria el age.
    return data;
  }

  async getById(id: string): Promise<Footballers> {
    const result = await FootballersModel.findById(id)
      .populate('autor', { footballers: 0 })
      .exec();
    if (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');
    return result;
  }

  // Adaptar este con el private save (sustituirlo por el fs.writefile)

  async create(newItem: Omit<Footballers, 'id'>): Promise<Footballers> {
    const userID = newItem.autor.id;
    newItem.autor = await this.repoUser.getById(userID);
    const result: Footballers = await FootballersModel.create(newItem);
    newItem.autor.footballers.push(result);
    await this.repoUser.update(userID, newItem.autor);

    return result;
  }

  async update(
    id: string,
    updatedItem: Partial<Footballers>
  ): Promise<Footballers> {
    const result = await FootballersModel.findByIdAndUpdate(id, updatedItem, {
      new: true,
    })
      .populate('autor', { footballers: 0 })
      .exec();
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
