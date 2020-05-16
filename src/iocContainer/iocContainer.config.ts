import { container } from 'tsyringe';
import { ContactModel } from 'src/components/contact/contact.model';
import { ObjectId } from 'mongodb';
import {
  contactModelSymbol, fetchSymbol, objectIdSymbol, gh_tokenSymbol
} from './iocContainer.types';
import fetch from 'node-fetch';
import { GH_TOKEN } from 'src/config';

container.register(contactModelSymbol, {
  useValue: ContactModel
});
container.register(objectIdSymbol, {
  useValue: ObjectId
});
container.register(gh_tokenSymbol, {
  useValue: GH_TOKEN
});
container.register(fetchSymbol, {
  useValue: fetch
})

