import { AuthenticationError } from 'apollo-server'

const type = (`
  type Resource {
    uuid : String!
    protocol : String!
    host : String!
    port : Int!
    path : String!
  }
`)

const resolvers = {

}

export {type, resolvers}
