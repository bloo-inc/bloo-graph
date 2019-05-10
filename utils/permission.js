import { permissions as permConf } from '../conf/permissions.js';
/**
 * Permission String Builder Proxy
 * @type {Object}
 */
let p = () => {
  let proxyString = '';
  let proxyOptions = [];
  let proxyDepth = [];

  let proxy = new Proxy({}, {
    get: function get(target, name) {
      return function wrapper() {

        let args = Array.prototype.slice.call(arguments);
        if (proxyOptions.length === 0) {
          for (let objName in permConf) {
            proxyOptions.push({
              type: "exec",
              name: objName
            });
          }
        }

        /* Check if name in scope */
        let valid = false;
        let last = false;
        for (var i = 0; i < proxyOptions.length; i++) {
          if (proxyOptions[i]['name'] == name) {
            valid = true;
            if (proxyOptions[i]['type'] == 'action') {
              last = true;
            }
          }
        }

        if (name == "all") {
          valid = true;
          last = true;
          name = "*";
        }

        if (!valid) {
          throw new Error('Invalid permission `'+name+'`.');
        }

        /* Rebuild the scope, based on this depth */
        proxyDepth.push(name);

        let currentScope = permConf;

        for (var i = 0; i < proxyDepth.length; i++) {
          if (i === 0) {
            currentScope = currentScope[proxyDepth[i]];
          } else {
            if ("children" in currentScope) {
              if (proxyDepth[i] in currentScope['children']) {
                currentScope = currentScope['children'][proxyDepth[i]];
              } else {
                currentScope = [];
              }
            } else {
              currentScope = [];
            }
          }
        }

        /* Build Execs & Actions */
        proxyOptions = [];
        if ("actions" in currentScope) {
          for (var i = 0; i < currentScope.actions.length; i++) {
            proxyOptions.push({
              type:"action",
              name: currentScope.actions[i]
            });
          }
        }

        if ("children" in currentScope) {
          for (var objName in currentScope.children) {
            proxyOptions.push({
              type:"exec",
              name: objName
            });
          }
        }

        if ("key" in currentScope) {
          if (currentScope.key) {
            if (typeof args[0] === "undefined") {
              throw new Error('Permission `'+name+'` requires a key.');
            }
            proxyString += "." + name + "("+args[0]+")";
          } else {
            proxyString += "." + name;
          }
        } else {
          proxyString += "." + name;
        }

        if (last) {
          proxy = proxyString.slice(1);
        }

        return proxy;
      }
    }
  });

  return proxy;
}

export { p }
