export const Query = `
  type Query {
    login(email: String, password: String): AuthPayload,
    logout: Void,
    isLoggedIn: User,
  }
`;