

export const Mutation = `
type Mutation {
  signup(email: String!, rawPassword: String!): AuthPayload!
}
`;