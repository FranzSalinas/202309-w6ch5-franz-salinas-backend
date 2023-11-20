import { Footballers } from '../models/footballers';
import fs from 'fs/promises';
import { Repository } from './repo';
import { HttpError } from '../types/http.error.js';
import createDebug from 'debug';

const debug = createDebug('w7E:footballers:repo');

export class FootballersFileRepo implements Repository<Footballers> {
  file: string;
  footballers: Footballers[];
  constructor() {
    debug('Instatiated');
    this.file = './data/data.json';
    this.footballers = [];
    this.loadData();
  }

  private async loadData() {
    const data = await fs.readFile(this.file, { encoding: 'utf-8' });
    this.footballers = JSON.parse(data);
  }

  async getAll(): Promise<Footballers[]> {
    return this.footballers;
  }

  async getById(id: string): Promise<Footballers> {
    const result = this.footballers.find((item) => item.id === id);
    if (!result) throw new Error('Not Found');
    return result;
  }

  search({
    _key,
    _value,
  }: {
    _key: string;
    _value: unknown;
  }): Promise<Footballers[]> {
    // Temp this.footballers.find((item) => item[_key] === _value)
    throw new Error('Method not implemented.');
  }

  // Adaptar este con el private save (sustituirlo por el fs.writefile)
  async create(newItem: Omit<Footballers, 'id'>): Promise<Footballers> {
    const result: Footballers = { ...newItem, id: crypto.randomUUID() };
    const newfootballers = [...this.footballers, result];
    await this.save(newfootballers as Footballers[]);
    return result;
  }

  async update(
    id: string,
    updatedItem: Partial<Footballers>
  ): Promise<Footballers> {
    let result = this.footballers.find((item) => item.id === id);
    if (!result) throw new Error('Not Found');
    result = { ...result, ...updatedItem } as Footballers;
    const newfootballers = this.footballers.map((item) =>
      item.id === id ? result : item
    );
    await this.save(newfootballers as Footballers[]);
    return result;
  }

  async delete(id: string): Promise<void> {
    const newfootballers = this.footballers.filter((item) => item.id !== id);

    if (newfootballers.length === this.footballers.length) {
      throw new HttpError(404, 'Not found', 'It is not possible to delete');
    }

    await this.save(newfootballers);
  }

  private async save(newfootballers: Footballers[]) {
    await fs.writeFile(this.file, JSON.stringify(newfootballers), {
      encoding: 'utf-8',
    });
    this.footballers = newfootballers;
  }
}
