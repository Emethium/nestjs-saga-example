import { schema, types } from 'papr';

export const accountSchema = schema(
  {
    _id: types.string({ required: true }),
    name: types.string({ required: true }),
    email: types.string({ required: true }),
  },
  { timestamps: true },
);

export type Account = (typeof accountSchema)[0];
export type AccountDefault = (typeof accountSchema)[1];
