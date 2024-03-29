import { resolvers } from './resolvers';
import { log } from '../utils/utils.js';
import fs from 'fs';

let typeDefs = [];

const Query =
`
  type Query {
    _empty: String
  }
`
typeDefs.push(Query);

const Mutation =
`
  type Mutation {
    _empty: String
  }
`
typeDefs.push(Mutation);

log.info("Building type definitions..");

let typeFiles = fs.readdirSync(__dirname + "/../types");

for (var i = 0; i < typeFiles.length; i++) {
  let typeFile = typeFiles[i];
  if (typeFile.endsWith(".js")) {
    let typeFilePath = fs.realpathSync(__dirname + "/../types/" + typeFile);
    let {type} = require(typeFilePath);
    typeDefs.push(type);
  }
}

let mutationFiles = fs.readdirSync(__dirname + "/../mutations");

for (var i = 0; i < mutationFiles.length; i++) {
  let mutationFile = mutationFiles[i];
  if (mutationFile.endsWith(".js")) {
    let mutationFilePath = fs.realpathSync(__dirname + "/../mutations/" + mutationFile);
    let {type} = require(mutationFilePath);
    typeDefs.push(type);
  }
}

export {typeDefs};
