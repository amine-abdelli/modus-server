export const User =`
type User {
  id: ID!
  name: String
  email: String
  moods: [Mood]
}`;

export const Mood = `
type Mood {
  id: ID!
  rate: Int!
  phrase: String
}
`;

export const Dairy = `
type Dairy {
  id: ID!
  title: String
  Content: String
}
`;