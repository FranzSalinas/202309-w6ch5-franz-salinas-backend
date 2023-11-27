import { ImgData } from '../types/img.data.js';
import { Footballers } from './footballers.js';

export type LoginUser = {
  userName: string;
  password: string;
};

export type User = LoginUser & {
  id: string;
  name: string;
  surname: string;
  age: number;
  avatar: ImgData;
  footballers: Footballers[];
};
