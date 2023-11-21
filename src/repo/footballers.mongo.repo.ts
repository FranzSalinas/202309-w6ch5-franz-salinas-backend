import { Footballers } from '../entities/footballers';
import { Repository } from './repo';
import { HttpError } from '../types/http.error.js';
import createDebug from 'debug';
import { FootballersModel } from './footballers.mongo.model.js';

const debug = createDebug('W7E:footballers:mongo:repo');

export class FootballersMongoRepo implements Repository<Footballers> {
  constructor() {
    debug('Instatiated');
  }

  async getAll(): Promise<Footballers[]> {
    const data = await FootballersModel.find();
    return data;
  }

  async getById(id: string): Promise<Footballers> {
    const result = await FootballersModel.findById(id);
    if (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');
    return result;
  }

  // Adaptar este con el private save (sustituirlo por el fs.writefile)

  async create(newItem: Omit<Footballers, 'id'>): Promise<Footballers> {
    const result: Footballers = await FootballersModel.create(newItem);
    return result;
  }

  async update(
    id: string,
    updatedItem: Partial<Footballers>
  ): Promise<Footballers> {
    const result = await FootballersModel.findByIdAndUpdate(id, updatedItem, {
      new: true,
    });
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    return result;
  }

  async delete(id: string): Promise<void> {
    const newfootballers = await FootballersModel.findByIdAndDelete(id);

    if (!newfootballers) {
      throw new HttpError(404, 'Not found', 'It is not possible to delete');
    }
  }
}
