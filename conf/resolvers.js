import fs from 'fs';
import { merge } from 'lodash';
import { log } from '../utils/utils.js';

let resolvers =  {};

log.info("Bundling resolvers..");

let typeFiles = fs.readdirSync(__dirname + "/../types");

for (var i = 0; i < typeFiles.length; i++) {
  let typeFile = typeFiles[i];
  if (typeFile.endsWith(".js")) {
    let typeFilePath = fs.realpathSync(__dirname + "/../types/" + typeFile);
    merge(resolvers, require(typeFilePath).resolvers);
  }
}

let mutationFiles = fs.readdirSync(__dirname + "/../mutations");

for (var i = 0; i < mutationFiles.length; i++) {
  let mutationFile = mutationFiles[i];
  if (mutationFile.endsWith(".js")) {
    let mutationFilePath = fs.realpathSync(__dirname + "/../mutations/" + mutationFile);
    merge(resolvers, require(mutationFilePath).resolvers);
  }
}

export { resolvers }
