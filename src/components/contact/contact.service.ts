import { injectable, inject } from 'tsyringe';
import {
  contactModelSymbol, objectIdSymbol, gh_tokenSymbol, fetchSymbol
} from 'src/iocContainer/iocContainer.types';
import type { ObjectIdConstructor, ICreateObj } from './contact.interface';
import type { IArgs, FetchType } from './contact.interface';
import type { Contact } from './contact.model';
import type { ReturnModelType } from '@typegoose/typegoose';

@injectable()
export class ContactService {
  constructor(
    @inject(contactModelSymbol) private ContactModel: ReturnModelType<typeof Contact>,
    @inject(fetchSymbol) private fetch: FetchType,
    @inject(objectIdSymbol) private ObjectId: ObjectIdConstructor,
    @inject(gh_tokenSymbol) private readonly GH_TOKEN: string
  ) { }

  public async getMore(cursor?: string, limit = 3): Promise<Contact[]> {
    return this.ContactModel
      .find({ ...cursor && { _id: { $gt: new this.ObjectId(cursor) } } }, '-__v -updatedAt')
      .limit(limit);
  }

  public async getOne(id: string): Promise<Contact | null> {
    return this.ContactModel.findById(id);
  }
  
  public async add(username: string) {
    const fetched = await this.fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `token ${this.GH_TOKEN}`
      },
      body: JSON.stringify({ query: `
      query userInfo($username: String!) {
        user(login: $username) {
          avatarUrl
          bio
          email
          name
          location
        }
      }
      `, variables: { username} }),
    });
    const { data } = await fetched.json();
    if (!data) return null;
    const {
      name, avatarUrl, bio, email, location
    } = data.user;
    const createObj: ICreateObj = { username };
    if (name) createObj.name = name;
    if (avatarUrl) createObj.avatarUrl = avatarUrl;
    if (bio) createObj.bio = bio;
    if (email) createObj.email = email;
    if (location) createObj.location = location;
    
    return this.ContactModel.create(createObj);
  }

  public async delete(id: string) {
    const _id = new this.ObjectId(id);
    return this.ContactModel.deleteOne({ _id })
  }

  public async edit(args: IArgs) {
    const { id, ...rest } = args;
    return this.ContactModel.findByIdAndUpdate(id, {
      ...rest
    }, {
      new: true
    });
  }
}