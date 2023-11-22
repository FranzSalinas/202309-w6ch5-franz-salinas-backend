import { Schema, model } from 'mongoose';
import { User } from '../../entities/user.js';

const userSchema = new Schema<User>({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },

  footballers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Footballers',
    },
  ],
});

userSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwd;
  },
});

export const UserModel = model('User', userSchema, 'users');
