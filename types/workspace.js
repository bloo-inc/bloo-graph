import { AuthenticationError } from 'apollo-server'

const type = (`
  type Workspace {
    uuid : String!
    name : String!
    type : String!
    resources: [Resource]!
  }
`)

const resolvers = {
  Workspace : {
    resources: async (root, {}, {user, log, db, err}) => {
      if (!user) { throw new AuthenticationError("Unauthorized") }

      let workspace = await db.Workspace.findByPk(root.uuid)

      return workspace.getResources();
    }
  }
}

export {type, resolvers}
