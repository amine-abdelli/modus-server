export const Mutation = `
  type Mutation {
    signup(email: String!, rawPassword: String!): AuthPayload!
    createMood(userId: String!, rate: Int!, phrase: String): AuthPayload!
    createDiary(userId: String!, title: String, content: String, date: Date): AuthPayload!
    deleteUser(email: String!, password: String!): Message
    addUserName(name: String!, id: String!): AuthPayload!
  }
`;