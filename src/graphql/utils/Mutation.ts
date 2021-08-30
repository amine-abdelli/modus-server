export const Mutation = `
  type Mutation {
    signup(email: String!, rawPassword: String!): AuthPayload!
    createMood(userId: String!, rate: Int!, phrase: String): AuthPayload!
    deleteUser(email: String!, password: String!): Message
    addUserName(name: String!, id: String!): AuthPayload!
  }
`;