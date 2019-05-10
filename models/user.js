module.exports = (sequelize, type) => {
  let model =  sequelize.define('User', {
      uuid: {
        primaryKey: true,
        type: type.UUID,
        defaultValue: type.UUIDV1
      },
      username: type.STRING,
      password: type.STRING,
      permissions: type.TEXT,
      email: type.STRING,
      name: type.STRING
  }, {
    tableName: 'bloo_users'
  });

  model.prototype.can = function (permissions, operator = "OR") {

    let can = null;

    /** Permission Comparison Operator Handling **/
    if (operator != "AND" && operator != "OR" ) { throw new Error('Invalid permission operator `'+operator+'`.') }

    switch (operator) {
      case 'OR':
          can = false;
        break;
      case 'AND':
          can = true;
        break;
    }

    let userPermissions = JSON.parse(this.permissions);

    /** Permission Type Standardisation **/
    if (!(permissions.constructor === Array)) { permissions = [permissions] }

    /** Possible Permission Resolution **/
    for (var i = 0; i < permissions.length; i++) {
      let permission = permissions[i];
      let splitPermission = permission.split(".");
      let possiblePermissions = [];
      for (var j = 0; j < splitPermission.length; j++) {
        if (j === 0) {
          possiblePermissions.push(splitPermission[j] + ".*");
        } else if (j === (splitPermission.length - 1)) {
          possiblePermissions.push(possiblePermissions[j - 1].substring(0, possiblePermissions[j - 1].length - 2) + "." + splitPermission[j]);
        } else {
          possiblePermissions.push(possiblePermissions[j - 1].substring(0, possiblePermissions[j - 1].length - 2) + "." + splitPermission[j] + ".*");
        }
      }

      let hasPermission = false;

      for (var j = 0; j < possiblePermissions.length; j++) {
        if (userPermissions.includes(possiblePermissions[j])) {
          hasPermission = true;
        }
      }

      switch (operator) {
        case 'OR':
            if (hasPermission) {
              can = true;
            }
          break;
        case 'AND':
            if (!hasPermission) {
              can = false;
            }
          break;
      }
    }

    if (userPermissions.includes('*')) {
      can = true;
    }

    return can;
  }

  return model;
};
