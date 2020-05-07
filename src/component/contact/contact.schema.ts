import { gql } from 'apollo-server-express';


export const contactSchema = gql`
  type Query {
    contacts: [Contact!]!
    contact(id: ID!): Contact
  }

  type Mutation {
    addContact(username: String!): Contact
    deleteContact(id: ID!): Boolean!
    editContact(
      id: ID!
      name: String
      avatarUrl: String
      bio: String
      email: String
      location: String
    ): Contact
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
`;
