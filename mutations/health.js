var osutils = require("os-utils");

const type = (`
  type healthSet {
    uptime: String
    memory: String
  }

  extend type Query {
    _health : healthSet
  }
`)

const resolvers = {
  Query: {
    _health: async (root, {}, {db}) => {
      return {memory:osutils.freemem() + "MB", uptime:osutils.sysUptime() + "ms"}
    }
  }
}

export {type, resolvers}
