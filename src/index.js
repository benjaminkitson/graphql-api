import { createServer } from '@graphql-yoga/node';

const posts = [{
  id: 1,
  title: 'First post!',
  body: 'Sweet content',
  author: 1
},{
  id: 2,
  title: 'Second post?',
  body: 'More cool content',
  author: 1
},{
  id: 3,
  title: 'Third post.',
  body: 'Anything after the second post is meh',
  author: 2
}]

const users = [{
  name: "Ben",
  id: 1
},{
  name: "Bob",
  id: 2
},{
  name: "Bill",
  id: 3
}]

const comments = [{
  post: 1,
  author: 2,
  body: "Shitpost ftw",
  id: 1
}, {
  post: 1,
  author: 1,
  body: "Go away trollolol",
  id: 2
}, {
  post: 3,
  author: 1,
  body: "lol wat",
  id: 3
}]


const typeDefs = `
  type Query {
    post: Post!
    user: User!
    posts(query: String!): [Post!]!
    users: [User!]!
    comments: [Comment!]!
    comment: Comment!
  }

  type User {
    name: String!
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
    post(parent, args, ctx, info) {
      return [{
        id: '96024',
        title: "Test",
        body: "Hello"
      }];
    },

    posts(parent, args, ctx, info) {
      if (!args) return posts
      return posts.filter(post => {
        const titleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
        const bodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
        return (titleMatch || bodyMatch)
      });
    },

    users(parent, args, ctx, info) {
      return users
    },

    comments(parent, args, ctx, info) {
      return comments
    }
  },

  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author
      });
    },

    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.post === parent.id
      })
    }
  },

  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id
      })
    },

    comments(parent, args, ctx, info) {
      return comments.find((comment) => {
        return comment.post === parent.comments
      })
    }
  },

  Comment: {
    post(parent, args, ctx, info) {
      return posts.find((post) => {
        return post.id === parent.post
      })
    },

    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author
      })
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
