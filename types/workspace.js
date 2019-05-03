import { AuthenticationError } from 'apollo-server'

const type = (`
  type Workspace {
    uuid : String!
    name : String!
    type : String!
  }
`)

const resolvers = {}

export {type, resolvers}
