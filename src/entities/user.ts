import { Footballers } from './footballers';

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
