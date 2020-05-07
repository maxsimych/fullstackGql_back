import { container } from 'tsyringe';
import { ContactModel } from 'src/component/contact/contact.model';
import { graphql } from '@octokit/graphql';
import { ObjectId } from 'mongodb';
import {
  contactModelSymbol, graphqlSymbol, objectIdSymbol, gh_tokenSymbol
} from './iocContainer.types';
import { GH_TOKEN } from 'src/config';
// import type { IContactModel, ObjectIdConstructor } from '../component/contact/contact.interface';

container.register(contactModelSymbol, {
  useValue: ContactModel
});
container.register(graphqlSymbol, {
  useValue: graphql
});
container.register(objectIdSymbol, {
  useValue: ObjectId
});
container.register(gh_tokenSymbol, {
  useValue: GH_TOKEN
})

