import { AuthenticationError } from 'apollo-server'
import { p } from '../utils/permission.js';

const type = (`
  type Workspace {
    uuid : String!
    name : String!
    type : String!
    resources: [Resource]!
  }

  extend type Query {
    workspace(uuid: String!): Workspace
  }
`)

const resolvers = {
  Workspace : {
    resources: async (root, {}, {user, log, db, err}) => {
      if (!user) { throw new AuthenticationError("Unauthorized") }

      let workspace = await db.Workspace.findByPk(root.uuid)

      return workspace.getResources();
    }
  },
  Query : {
    workspace: async (root, {uuid}, {user, log, db, err}) => {
      if (!user) { throw new AuthenticationError("Unauthorized") }

      if (!user.can([
        p().workspace(uuid).view()
      ], 'AND')) { throw new AuthenticationError("Not allowed") }

      let workspace = await db.Workspace.findByPk(uuid);
      return workspace;
    }
  }
}

export {type, resolvers}
