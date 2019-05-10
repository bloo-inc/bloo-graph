/**
 * Permission Configuration
 * @type {Object}
 */
const permissions = {
  workspace: {
    key: true,
    actions: ['view', 'edit', 'delete'],
    children: {
      resource: {
        key: true,
        actions: ['view', 'edit', 'delete', 'execute']
      }
    }
  },
  workspaces: {}
}

export { permissions }
