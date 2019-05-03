import http from 'http';
import express from 'express';
import jwt from 'jsonwebtoken';

import { ApolloServer } from 'apollo-server-express';

import { db } from './models';
import { config, env } from './conf/config.js';
import { typeDefs } from './conf/schema';
import { resolvers } from './conf/resolvers';
import { log } from './utils/utils.js';

log.info('Running in ' + config.env + ' mode.');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
   let token = req.headers.authorization || null;

   let user = null;
   let err = null;

   if (token !== null) {
     token = token.substring(7);
     try {
       let payload = jwt.verify(token, Buffer.from(env.JWT_SECRET, 'base64'));
       let uuid = payload.uuid || null;
       if (uuid != null) {
         user = await db.User.findByPk(uuid);
       }
     } catch (errMsg) {
       err = errMsg;
     }
   }

   return { log, user, db, err };
 },
 playground: false,
 debug: (config.env === 'development')
})

const app = express();

app.get('/', function (req, res) {
  res.send("".repeat(1025));
})

server.applyMiddleware({ app, path:config.graphPath });

app.listen({
  port: config.graphPort
},() => {
  log.info('GraphQL service initiated.');
});
