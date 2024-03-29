'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
import { config, env } from '../conf/config.js';
const db = {};

let sequelize = new Sequelize(env.REF_DB_NAME, env.REF_DB_USERNAME, env.REF_DB_PASSWORD, {
  dialect: 'mariadb',
  host: env.REF_DB_HOST,
  logging: false
});

sequelize.sync({
  force: false
}, () => {})

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

/**
 * Model Associations
 */

db.User.hasMany(db.Workspace, {
  as: "Workspaces",
  foreignKey: 'owner_uuid' /* Owner Relation */
});

db.Workspace.hasMany(db.Resource, {
  as: "Resources",
  foreignKey: 'workspace_uuid' /* Workspace Relation */
});

export { db }
