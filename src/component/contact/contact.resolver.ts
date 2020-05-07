import type { IResolvers } from "apollo-server-express";
import type { IContext, IArgs, IArgsUsername, IContact } from "./contact.interface";
import { container } from "tsyringe";
import { Contact } from "./contact.service";

export const contactResolver: IResolvers = {
  Query: {
    contacts: async (parent: undefined, args: {}, ctx: IContext): Promise<IContact[]>  => {
      const contact = ctx.container.resolve(ctx.service.Contact);
      return contact.getAll();
    },
    contact: async (parent: undefined, args: Pick<IArgs, 'id'>, ctx: IContext): Promise<IContact | null> => {
      const contact = ctx.container.resolve(ctx.service.Contact);
      return contact.getOne(args.id)
    }
  },
  Mutation: {
    addContact: async (parent: undefined, args: IArgsUsername): Promise<IContact | null> => {
      console.log(parent);
      console.log(typeof parent);
      const contact = container.resolve(Contact);
      return contact.add(args.username);
    },
    deleteContact: async (parent: undefined, args: Pick<IArgs, 'id'>): Promise<boolean> => {
      const contact = container.resolve(Contact);
      const result = await contact.delete(args.id);
      return result.n === 1;
    },
    editContact: async (parent: undefined, args: IArgs): Promise<IContact | null> => {
      const contact = container.resolve(Contact);
      return contact.edit(args);
    }
  }
}