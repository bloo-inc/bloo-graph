const config = {
  env: process.env.NODE_ENV || 'development',
  graphPort: 4000,
  graphPath: "/",
  graphSubscriptionPath: "/",
  accessTokenLife: 3600,
  refreshTokenLife: 86400
}

if (config.env == 'development') {
  require('dotenv').config()
  config.accessTokenLife = 86400;
}

const env = process.env;

export { config, env }
