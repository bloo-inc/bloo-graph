module.exports = (sequelize, type) => {
  return sequelize.define('Resource', {
      uuid: {
        primaryKey: true,
        type: type.UUID,
        defaultValue: type.UUIDV1
      },
      protocol: type.STRING,
      host: type.TEXT,
      port: type.INTEGER,
      path: type.TEXT,
  }, {
    tableName: 'bloo_resources'
  });
};
