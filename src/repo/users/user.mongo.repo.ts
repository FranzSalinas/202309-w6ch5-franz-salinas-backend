import createDebug from 'debug';
import { Repository } from '../repo';
import { LoginUser, User } from '../../entities/user';
import { UserModel } from './user.mongo.model';
import { HttpError } from '../../types/http.error';
import { Auth } from '../../services/auth.js';

const debug = createDebug('W7E:users:mongo:repo');

export class UserMongoRepo implements Repository<User> {
  constructor() {
    debug('');
  }

  async login(LoginUser: LoginUser): Promise<User> {
    const result = await UserModel.findOne({
      userName: LoginUser.userName,
    }).exec();
    if (!result || !(await Auth.compare(LoginUser.password, result.password)))
      throw new HttpError(401, 'Unauthorized');
    return result;
  }

  async getAll(): Promise<User[]> {
    const result = await UserModel.find().exec();
    return result;
  }

  async getById(id: string): Promise<User> {
    const result = await UserModel.findById(id).exec();
    if (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');
    return result;
  }

  async create(newItem: Omit<User, 'id'>): Promise<User> {
    const result: User = await UserModel.create(newItem);
    return result;
  }

  async update(_id: User, _updatedItem: User): Promise<User> {
    const result = await UserModel.findByIdAndUpdate(id, updatedItem, {
      new: true,
    }).exec();
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    return result;
  }

  delete(_id: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
