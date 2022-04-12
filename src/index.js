import { createServer } from '@graphql-yoga/node';

const typeDefs = `
  type Query {
    name: String
  }
`;

const resolvers = {
  Query: {
    name() {
      return 'Ben'
    }
  }
};

const server = new createServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log('Hello from the server')
})
