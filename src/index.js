import { createServer } from '@graphql-yoga/node';

const typeDefs = `
  type Query {
    name: String!
    id: ID!
    age: Int!
    employed: Boolean!
    favouriteNumber: Float
  }
`;

const resolvers = {
  Query: {
    name() {
      return 'Ben'
    },
    id() {
      return '96024'
    },
    age() {
      return 27
    },
    employed() {
      return false
    },
    favouriteNumber() {
      return 3.141
    },
  }
};

const server = new createServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log('Hello from the server')
})
