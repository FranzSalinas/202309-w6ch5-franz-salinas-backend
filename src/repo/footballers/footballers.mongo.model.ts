import { Schema, model } from 'mongoose';
import { Footballers } from '../../entities/footballers';

const footballersSchema = new Schema<Footballers>({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  nationality: {
    type: String,
    required: true,
  },
  preferredFoot: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  autor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

footballersSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwd;
  },
});

export const FootballersModel = model(
  'Footballer',
  footballersSchema,
  'footballers'
);
