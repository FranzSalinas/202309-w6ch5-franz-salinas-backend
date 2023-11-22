import { User } from './user';

export type Footballers = {
  id: string;
  name: string;
  team: string;
  position: string;
  preferredFoot: string;
  image: string;
  nationality: string;
  age: number;
  autor: User;
};
