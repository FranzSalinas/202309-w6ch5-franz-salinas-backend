import { Request, Response } from 'express';
import fs from 'fs/promises';
import { Footballers } from '../models/footballers.js';
import { ObjectEncodingOptions } from 'fs';

const fileRoad = './api/db.json';

const options: ObjectEncodingOptions = {
  encoding: 'utf-8',
};
let footballersFinalData: Footballers[] = [];

const footballersDataReader = async () => {
  try {
    const footballersData = (await fs.readFile(fileRoad, options)) as string;
    footballersFinalData = JSON.parse(footballersData).footballers || [];
  } catch (error) {
    console.log('Ocurrio un error en la lectura del db.json', error);
  }
};

footballersDataReader();

export const getAll = (_req: Request, res: Response) => {
  res.json(footballersFinalData);
};

export const getById = (req: Request, res: Response) => {
  const result = footballersFinalData.find(
    (item) => item.id === Number(req.params.id)
  );
  res.json(result);
};

export const search = (_req: Request, _res: Response) => {};

export const create = (req: Request, res: Response) => {
  const result = { ...req.body, id: footballersFinalData.length + 1 };
  footballersFinalData.push(result);
  res.json(result);
};

export const update = (req: Request, res: Response) => {
  let result = footballersFinalData.find(
    (item) => Number(item.id) === Number(req.params.id)
  );
  result = { ...result, ...req.body };
  footballersFinalData[
    footballersFinalData.findIndex((item) => item.id === Number(req.params.id))
  ] = result!;
  res.json(result);
};

export const remove = (req: Request, res: Response) => {
  footballersFinalData.splice(
    footballersFinalData.findIndex((item) => item.id === Number(req.params.id)),
    1
  );
  res.json({});
};
