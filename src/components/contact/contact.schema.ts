import { gql } from 'apollo-server-express';


export const contactSchema = gql`
  type Query {
    moreContacts(cursor: String): MoreContacts!
    contact(id: ID!): Contact
  }

  type Mutation {
    addContact(username: String!): Contact
    deleteContact(id: ID!): ID!
    editContact(
      id: ID!
      name: String
      avatarUrl: String
      bio: String
      email: String
      location: String
    ): Contact
  }

  type Subscription {
    contactAdded: Contact!
  }

  type Contact {
    id: ID!
    username: String!
    avatarUrl: String
    bio: String
    email: String
    name: String
    location: String
  }

  type MoreContacts {
    cursor: String
    contacts: [Contact!]!
  }
`;
