
export const User =`
type User {
  id: ID!
  name: String
  email: String
  moods: [Mood]
  diaries: [Diary]
}`;

export const Mood = `
type Mood {
  id: ID!
  rate: Int!
  phrase: String
  createdAt: Date
}
`;

export const Diary = `
type Diary {
  id:          ID!
  createdAt:   Date
  date:        Date
  title:       String
  content:     String
}
`;

export const Profile = `
type Profile {
  id: ID!
  name: String
  bio: String
  age: Int
  gender: String
  country: String
}`;