/* eslint-disable no-negated-condition */
import { Request, Response } from 'express';
import { ObjectEncodingOptions } from 'fs';
import fs from 'fs/promises';
import { Footballers } from '../models/footballers';

const fileRoad = './api/db.json';

const options: ObjectEncodingOptions = {
  encoding: 'utf-8',
};
const readFootballersData = async () => {
  try {
    const footballersData = (await fs.readFile(fileRoad, options)) as string;
    const footballersFinalData = JSON.parse(footballersData)
      .footballers as Footballers[];
    return footballersFinalData;
  } catch (error) {
    console.log('Ocurrió un error en la lectura del db.json', error);
    throw new Error('Error al obtener datos');
  }
};

const writeFootballersData = async (data: Footballers[]) => {
  try {
    await fs.writeFile(
      fileRoad,
      JSON.stringify({ footballers: data }),
      options
    );
  } catch (error) {
    console.log('Ocurrió un error al escribir en db.json', error);
    throw new Error('Error al escribir datos');
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const data = await readFootballersData();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const data = await readFootballersData();
    const result = data.find((item) => item.id === Number(req.params.id));
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: 'Footballer not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const data = await readFootballersData();
    const result = { ...req.body, id: data.length + 1 };
    data.push(result);
    await writeFootballersData(data);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const data = await readFootballersData();
    const index = data.findIndex((item) => item.id === Number(req.params.id));
    if (index !== -1) {
      data[index] = { ...data[index], ...req.body };
      await writeFootballersData(data);
      res.json(data[index]);
    } else {
      res.status(404).json({ message: 'Footballer not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const data = await readFootballersData();
    const index = data.findIndex((item) => item.id === Number(req.params.id));
    if (index !== -1) {
      data.splice(index, 1);
      await writeFootballersData(data);
      res.json({});
    } else {
      res.status(404).json({ message: 'Footballer not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
