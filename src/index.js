import { createServer } from '@graphql-yoga/node';
import { posts, users, comments } from './data';

// createPost(title: String!, body: String!, author: User!)

const typeDefs = `
  type Query {
    post: Post!
    user: User!
    posts(query: String!): [Post!]!
    users: [User!]!
    comments: [Comment!]!
    comment: Comment!
  }

  type Mutation {
    createUser(name: String!, username: String!): [User!]!
  }

  type User {
    name: String!
    username: String!
    id: ID!
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    body: String!
    author: User!
    post: Post!
  }
`;

const resolvers = {
  Query: {
    posts(parent, args, ctx, info) {
      if (!args) return posts;
      return posts.filter(post => {
        const titleMatch = post.title.toLowerCase().includes(args.query.toLowerCase());
        const bodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase());
        return (titleMatch || bodyMatch);
      });
    },

    users(parent, args, ctx, info) {
      return users;
    },

    comments(parent, args, ctx, info) {
      return comments;
    }
  },

  Mutation: {
    createUser(parent, args, ctx, info) {
      const isTaken = users.some(user => user.username === args.username);

      if (isTaken) {
        throw new Error("Username is taken!")
      }

      const newUser = {
        id: users.length + 1,
        name: args.name,
        username: args.username
      };

      users.push(newUser);

      return users;
    }
  },

  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },

    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.post === parent.id;
      });
    }
  },

  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id;
      });
    },

    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.author === parent.id;
      });
    }
  },

  Comment: {
    post(parent, args, ctx, info) {
      return posts.find((post) => {
        return post.id === parent.post;
      });
    },

    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
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
