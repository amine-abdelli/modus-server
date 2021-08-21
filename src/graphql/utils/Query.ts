export const Query = `
  type Query {
    hello(message: String): String!,
    login(email: String, password: String): AuthPayload,
    logout: Void 
  }
`;