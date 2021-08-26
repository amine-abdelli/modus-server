import express from 'express';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { Query, Mutation } from './resolvers/index';
import { typeDefs } from './graphql/schemaTypeDefs';
import { createContext } from './graphql/utils/context';

dotenv.config();

const PORT = process.env.PORT || 4000;

async function startServer(){
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: { 
      Query, 
      Mutation
    },
    context: createContext
    }
  );
  await apolloServer.start();
  app.use(cookieParser());
  apolloServer.applyMiddleware({
    app, 
    cors: {
      credentials: true,
      origin: 'http://localhost:3000',
    }});
    
  app.use((req, res) => {
    res.send('Hello from express apollo server');
  })
  app.listen(PORT, () => console.log("Server is running on port 4000"));
};

startServer();