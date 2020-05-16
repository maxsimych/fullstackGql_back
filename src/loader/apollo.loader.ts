import { container } from 'tsyringe';
import { ApolloServer } from 'apollo-server-express';
import type { Application } from 'express';
import { contactSchema } from 'src/components/contact/contact.schema';
import { ContactService } from 'src/components/contact/contact.service';
import { contactResolver } from 'src/components/contact/contact.resolver';

export const apolloLoader = (app: Application): Application => {
  const server = new ApolloServer({
    typeDefs: contactSchema,
    resolvers: [contactResolver],
    context: {
      service: { Contact: ContactService },
      container
    }
  })

  server.applyMiddleware({ app, path: '/graphql' });

  return app;
}