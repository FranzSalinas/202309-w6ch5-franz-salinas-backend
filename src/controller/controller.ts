/* eslint-disable no-negated-condition */
import { Request, Response } from 'express';
import { FootballersFileRepo } from '../repo/footballers.file.repo.js';
import createDebug from 'debug';
import { HttpError } from '../types/http.error';

const debug = createDebug('w7E:footballers:controller');

export class FootballerController {
  repo: FootballersFileRepo;
  constructor() {
    debug('Instatiated');
    this.repo = new FootballersFileRepo();
  }

  async getAll(_req: Request, res: Response) {
    const result = await this.repo.getAll();
    res.json(result);
  }

  search = async (_req: Request, _res: Response) => {};

  async getById(req: Request, res: Response) {
    const result = await this.repo.getById(req.params.id);
    res.json(result);
  }

  async create(req: Request, res: Response) {
    const result = await this.repo.create(req.body);
    res.status(201);
    res.statusMessage = 'Created';
    res.json(result);
  }

  async update(req: Request, res: Response) {
    const result = await this.repo.update(req.params.id, req.body);
    res.json(result);
  }

  async delete(req: Request, res: Response) {
    try {
      await this.repo.delete(req.params.id);
      res.status(204);
      res.statusMessage = 'No Content';
      res.json({});
    } catch (error) {
      res.status((error as HttpError).status);
      res.statusMessage = (error as HttpError).statusMessage;
      res.json({});
      console.log((error as HttpError).message);
    }
  }
}
