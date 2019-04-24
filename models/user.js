module.exports = (sequelize, type) => {
  return sequelize.define('User', {
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
};
