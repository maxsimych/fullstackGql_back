import { injectable, inject } from 'tsyringe';
import {
  contactModelSymbol, graphqlSymbol, objectIdSymbol, gh_tokenSymbol
} from 'src/iocContainer/iocContainer.types';
import type { graphql as graphqlType } from '@octokit/graphql/dist-types/types';
import type {
  IContactModel, ObjectIdConstructor, IContact, ICreatObj
} from './contact.interface';
import type { IArgs } from './contact.interface';

@injectable()
export class Contact {
  constructor(
    @inject(contactModelSymbol) private ContactModel: IContactModel,
    @inject(graphqlSymbol) private graphql: graphqlType,
    @inject(objectIdSymbol) private ObjectId: ObjectIdConstructor,
    @inject(gh_tokenSymbol) private readonly GH_TOKEN: string
  ) { }

  public async getAll(): Promise<IContact[]> {
    return this.ContactModel.find({}, '-__v -updatedAt');
  }

  public async getOne(id: string): Promise<IContact | null> {
    return this.ContactModel.findById(id);
  }
  
  public async add(username: string) {
    const response = await this.graphql(`query userInfo($username: String!) {
      user(login:$username) {
        avatarUrl
        bio
        email
        name
        location
      }
    }
    `, {
      username,
      headers: {
        authorization: `token ${this.GH_TOKEN}`
      }
    });
    if (!response) return null;
    const {
      name, avatarUrl, bio, email, location
    } = response.user;
    const createObj: ICreatObj = { username };
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