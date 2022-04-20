const posts = [{
  id: 1,
  title: 'First post!',
  body: 'Sweet content',
  author: 1
}, {
  id: 2,
  title: 'Second post?',
  body: 'More cool content',
  author: 1
}, {
  id: 3,
  title: 'Third post.',
  body: 'Anything after the second post is meh',
  author: 2
}]

const users = [{
  name: "Ben",
  username: "benboi",
  id: 1
}, {
  name: "Bob",
  username: "bobbo",
  id: 2
}, {
  name: "Bill",
  username: "billbaggins",
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

export { posts, users, comments }
