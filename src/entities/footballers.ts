import { ImgData } from '../types/img.data.js';
import { User } from './user.js';

export type Footballers = {
  id: string;
  name: string;
  team: string;
  position: string;
  preferredFoot: string;

  imageFootballer: ImgData;
  nationality: string;
  age: number;
  autor: User;
};
