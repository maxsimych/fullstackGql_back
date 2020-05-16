import { PubSub } from 'apollo-server';
import { container } from 'tsyringe';
import type { IResolvers } from 'apollo-server-express';
import type { IContext, IArgs, IArgsUsername, ICursor } from './contact.interface';
import type { Contact } from './contact.model';

const pubsub = new PubSub();

const COMMENT_ADDED = 'COMMENT_ADDED';

interface IMoreContacts {
  cursor: string | null;
  contacts: Contact[]
}

export const contactResolver: IResolvers = {
  Query: {
    moreContacts: async (_root: undefined, args: ICursor, ctx: IContext): Promise<IMoreContacts>  => {
      const contact = ctx.container.resolve(ctx.service.Contact);
      
      const contacts = await contact.getMore(args.cursor);

      let cursor: IMoreContacts['cursor'] = null;

      if (contacts.length) {
        cursor = contacts[contacts.length - 1]._id.toString();
      }
      return {
        cursor,
        contacts
      }
    },
    contact: async (_root: undefined, args: Pick<IArgs, 'id'>, ctx: IContext): Promise<Contact | null> => {
      const contact = ctx.container.resolve(ctx.service.Contact);
      return contact.getOne(args.id)
    }
  },
  Mutation: {
    addContact: async (_root: undefined, args: IArgsUsername, ctx: IContext): Promise<Contact | null> => {
      const contact = container.resolve(ctx.service.Contact);
      const result = await contact.add(args.username);
      if (result) {
        pubsub.publish(COMMENT_ADDED, { contactAdded: result });
      }
      
      return result;
    },
    deleteContact: async (_root: undefined, args: Pick<IArgs, 'id'>, ctx: IContext): Promise<string> => {
      const contact = container.resolve(ctx.service.Contact);
      const result = await contact.delete(args.id);

      if (result.n === 1) return args.id;
      return  '';
    },
    editContact: async (_root: undefined, args: IArgs, ctx: IContext): Promise<Contact | null> => {
      const contact = container.resolve(ctx.service.Contact);
      return contact.edit(args);
    }
  },
  Subscription: {
    contactAdded: {
      subscribe: () => pubsub.asyncIterator(COMMENT_ADDED)
    }
  }
}