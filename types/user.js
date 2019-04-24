import { AuthenticationError } from 'apollo-server'

const type = (`
  type User {
    uuid : String!
    username : String!
    email : String!
    name : String!
  }

  extend type Query {
    self : User
  }
`)

const resolvers = {
  Query : {
    self: (root, {}, {user, log, db, err}) => {
      if (!user) { throw new AuthenticationError("Unauthorized") }
      return user;
    }
  }
}

export {type, resolvers}
