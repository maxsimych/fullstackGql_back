import { container } from 'tsyringe';
import { ApolloServer } from 'apollo-server-express';
import type { Application } from "express";
import { contactSchema } from 'src/component/contact/contact.schema';
import { Contact } from 'src/component/contact/contact.service';
import { contactResolver } from 'src/component/contact/contact.resolver';

export const apolloLoader = (app: Application): Application => {
  const server = new ApolloServer({
    typeDefs: contactSchema,
    resolvers: [contactResolver],
    context: {
      service: { Contact },
      container
    }
  })

  server.applyMiddleware({ app, path: '/graphql' });

  return app;
}