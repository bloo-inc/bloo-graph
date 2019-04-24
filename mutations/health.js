var osu = require('node-os-utils');
var cpu = osu.cpu;
var mem = osu.mem;

const type = (`
  type healthSet {
    memoryUsage: String
    cpuUsage: String
  }

  extend type Query {
    _health : healthSet
  }
`)

const resolvers = {
  Query: {
    _health: async (root, {}, {db}) => {

      let memoryUsage = await mem.info();
      memoryUsage = memoryUsage.usedMemMb + "Mb";

      let cpuUsage = await cpu.usage() + "%";

      return {memoryUsage, cpuUsage}
    }
  }
}

export {type, resolvers}
