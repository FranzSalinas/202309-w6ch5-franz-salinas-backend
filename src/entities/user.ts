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
  footballers: Footballers[];
};
