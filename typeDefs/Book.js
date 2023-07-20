const { gql } = require('apollo-server');

module.exports.typeDef = gql`
  type Book {
    id: Int!
    title: String!
    authors: [Author]
  }

  type Query {
    books: [Book]
  }
`;