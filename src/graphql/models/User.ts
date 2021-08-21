export const User =`
type User {
  id: ID!
  name: String
  email: String
  diaries: [Dairy]
  mood: [Mood]
}`;

export const Mood = `
type Mood {
  id: ID!
  rate: Int!
}
`;

export const Dairy = `
type Dairy {
  id: ID!
  title: String
  Content: String
}
`;