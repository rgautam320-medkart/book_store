const { gql } = require('apollo-server');

module.exports.typeDef = gql`
  type Author {
    id: Int!
    name: String!
    books: [Book]
  }

  type Query {
    authors: [Author]
  }
`;