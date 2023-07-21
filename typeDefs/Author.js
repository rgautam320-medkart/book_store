const { gql } = require('apollo-server');

module.exports.typeDef = gql`
  enum Language {
    ENGLISH
    SPANISH
    GERMAN
    HINDI
    NEPALI
  }

  type Author {
    id: Int!
    name: String!
    email: String!
    dob: String
    language: Language!
    biography: String
    website: String
    created_at: String!
    updated_at: String
  }

  input CreateAuthorInput {
    name: String!
    email: String!
    dob: String
    language: Language!
    biography: String
    website: String
  }

  input UpdateAuthorInput {
    name: String!
    dob: String
    language: Language!
    biography: String
    website: String
  }

  type AuthorResponse {
    id: Int!
    name: String!
    email: String!
    dob: String!
    language: Language!
    biography: String
    website: String
    created_at: String!
    created_by: String!
    updated_by: String
    updated_at: String
  }

  type MessageResponse {
    message: String!
  }

  type Query {
    authors: [AuthorResponse!]! 
    author(authorId: Int!): AuthorResponse!
  }

  type Mutation {
    createAuthor(createAuthor: CreateAuthorInput) : AuthorResponse
    updateAuthor(authorId: Int! updateAuthor: UpdateAuthorInput) : AuthorResponse
    deleteAuthor(authorId: Int) : MessageResponse
  }
`;