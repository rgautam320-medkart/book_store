const { gql } = require('apollo-server');

module.exports.typeDef = gql`
  enum Gender {
    MALE
    FEMALE
  }

  type User {
    id: ID!
    username: String!
    email: String!
    gender: Gender!
    age: Int
    password: String!
    created_at: String!
    updated_at: String
  }

  input RegisterUserInput {
    username: String!
    email: String!
    gender: Gender!
    age: Int
    password: String!
  }

  input UpdateUserInput {
    email: String!
    gender: Gender!
    age: Int
  }

  type UserResponse {
    username: String!
    email: String!
    gender: Gender!
    age: Int
    created_at: String!
    updated_at: String!
  }

  type LoginResponse {
    username: String!
    email: String!
    gender: Gender!
    age: Int!
    token: String!
  }

  type PasswordChangeResponse {
    message: String!
  }

  type DeleteUserResponse {
    message: String!
  }

  type Query {
    me: UserResponse
    users: [UserResponse!]!
  }

  type Mutation {
    register(registerUser: RegisterUserInput): UserResponse
    login(username: String!, password: String!): LoginResponse
    updateUser(updateUser: UpdateUserInput) : UserResponse
    changePassword(password: String!, newPassword: String!): PasswordChangeResponse
    deleteUser(userId: Int!): DeleteUserResponse
  }
`;
