import type { ObjectId } from 'mongodb';
import type { DependencyContainer } from 'tsyringe';
import type fetch from 'node-fetch';
import type { ContactService } from './contact.service';
 
export interface ICreateObj {
  username: string;
  bio?: string;
  name?: string;
  email?: string;
  location?: string;
  avatarUrl?: string;
}

export type ObjectIdConstructor = new (str: string) => ObjectId;


export type FetchType = typeof fetch;

export interface IContext {
  service: {
    Contact: typeof ContactService,
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

export interface ICursor {
  cursor?: string;
}

