import type { Document, Model } from 'mongoose';
import type { ObjectId } from 'mongodb';
import type { DependencyContainer } from 'tsyringe';
import type { Contact } from './contact.service';
 
export interface ICreatObj {
  username: string;
  bio?: string;
  name?: string;
  email?: string;
  location?: string;
  avatarUrl?: string;
}

export type ObjectIdConstructor = new (str: string) => ObjectId;

export interface IContact extends Document {
  username: string;
  name?: string,
  avatarUrl?: string,
  bio?: string,
  location?: string,
  email?: string
  createdAt?: Date,
  updatedAt?: Date
}

export type IContactModel = Model<IContact>;

export interface IContext {
  service: {
    Contact: typeof Contact,
  }
  container: DependencyContainer
}

export interface IArgsUsername {
  username: string
}

export interface IArgs {
  id: string;
  name?: string;
  avatarUrl?: string;
  bio?: string;
  email?: string;
  location?: string;
}

