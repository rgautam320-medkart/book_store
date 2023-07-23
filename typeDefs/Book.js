const { gql } = require('apollo-server');

module.exports.typeDef = gql`
  enum Genre {
    FICTION
    NOVEL
    ROMANCE
    HISTORICAL
    MYSTERY
  }

  type BookAuthorResponse {
    author: AuthorResponse
  }

  type BookResponse {
    id: Int!
    title: String!
    description: String!
    published_year: Int!
    isbn: String!
    genre: Genre!
    created_at: String!
    updated_at: String
    created_by: String!
    updated_by: String
    authors: [BookAuthorResponse!]!
  }

  input CreateBookInput {
    title: String!
    description: String!
    published_year: Int!
    isbn: String!
    genre: Genre!
    authors: [Int!]!
  }

  input UpdateBookInput {
    title: String!
    description: String!
    published_year: Int!
    isbn: String!
    genre: Genre!
    author: [Int!]!
  }

  type Query {
    books: [BookResponse!]! 
    book(bookId: Int!): BookResponse!
  }

  type Mutation {
    createBook(createBook: CreateBookInput) : BookResponse
    updateBook(bookId: Int! updateBook: UpdateBookInput) : BookResponse
    deleteBook(bookId: Int) : MessageResponse
  }
`;