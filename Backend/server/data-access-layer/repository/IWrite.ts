import * as mongoose from 'mongoose';

export interface IWrite<T> {
  create: (item: T, callback: (error: any, result: any) => void) => void;
  update: (_id: mongoose.Types.ObjectId, item: T, callback: (error: any, result: any) => void) => void;
  delete: (_id: string, callback: (error: any, result: any) => void) => void;
  save: (item: T, options?: mongoose.SaveOptions, callback?: (error: any, result: T) => void) => Promise<T>;
};