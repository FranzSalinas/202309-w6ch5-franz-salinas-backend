import { Footballers } from '../../entities/footballers.js';
import { Repository } from '../repo.js';
import { HttpError } from '../../types/http.error.js';
import createDebug from 'debug';
import { FootballersModel } from './footballers.mongo.model.js';
import { UserMongoRepo } from '../users/user.mongo.repo.js';

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
    debug(id, 'id value in getById');
    const result = await FootballersModel.findById(id)
      .populate('autor', { footballers: 0 })
      .exec();
    debug('get by id result', result);
    if (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');
    return result;
  }

  // Adaptar este con el private save (sustituirlo por el fs.writefile)

  async create(newItem: Omit<Footballers, 'id'>): Promise<Footballers> {
    const userID = newItem.autor.id;
    debug('userID value', newItem);

    const user = await this.repoUser.getById(userID);
    const result: Footballers = await FootballersModel.create({
      ...newItem,
      autor: userID,
    });
    user.footballers.push(result);
    await this.repoUser.update(userID, user);

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

  async search({
    key,
    value,
  }: {
    key: keyof Footballers;
    value: any;
  }): Promise<Footballers[]> {
    const result = await FootballersModel.find({ [key]: value })
      .populate('author', {
        notes: 0,
      })
      .exec();

    return result;
  }
}
