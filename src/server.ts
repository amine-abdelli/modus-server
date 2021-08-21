import express from 'express';
import { ApolloServer } from 'apollo-server-express';
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
  apolloServer.applyMiddleware({app: app, path: '/graphql'});
  app.use(cookieParser());
  app.use((req, res) => {
    res.send('Hello from express apollo server')
  })
  app.listen(4000, () => console.log("Server is running on port 4000"))
}

startServer();