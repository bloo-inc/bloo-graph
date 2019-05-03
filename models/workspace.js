module.exports = (sequelize, type) => {
  return sequelize.define('Workspace', {
      uuid: {
        primaryKey: true,
        type: type.UUID,
        defaultValue: type.UUIDV1
      },
      name: type.STRING,
      type: type.STRING,
  }, {
    tableName: 'bloo_workspaces'
  });
};
