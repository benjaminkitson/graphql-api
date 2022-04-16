import { createServer } from '@graphql-yoga/node';

const typeDefs = `
  type Query {
    me: User!
  }

  type User {
    name: String!
    id: ID!
    age: Int!
    employed: Boolean!
    favouriteNumber: Float
  }
`;

const resolvers = {
  Query: {
    me() {
      return {
        name: 'Ben',
        id: '96024',
        age: 26,
        employed: true,
        favouriteNumber: 3.141
      };
    }
  }
};

const server = createServer({
  schema: {
    typeDefs,
    resolvers
  }
});

server.start(() => {
  console.log('Hello from the server')
});
