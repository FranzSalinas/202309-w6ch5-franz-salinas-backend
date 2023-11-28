import { Schema, model } from 'mongoose';
import { User } from '../../entities/user.js';

const userSchema = new Schema<User>({
  userName: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },

  name: {
    type: String,
  },

  avatar: {
    publicId: String,
    size: Number,
    height: Number,
    width: Number,
    format: String,
    url: String,
  },

  surname: {
    type: String,
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

export const UserModel = model<User>('User', userSchema, 'users');
