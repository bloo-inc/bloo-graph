import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { AuthenticationError } from 'apollo-server'
import { config, env } from '../conf/config.js';

const type = (`
  type authTokens {
    accessToken: String
    refreshToken: String
  }

  extend type Mutation {
    _auth(username: String!, password: String!) : authTokens!
    _refresh(refreshToken: String!) : authTokens!
  }
`)

const resolvers = {
  Mutation: {
    _auth: async (root, {username, password}, {db}) => {

      let user = await db.User.findOne({
        where: {
          username: username,
          password: crypto.createHash('sha256').update(password).digest('hex')
        }
      });

      if (!user) {
        throw new AuthenticationError("Invalid credentials.");
      }

      let accessToken = jwt.sign({
        uuid:user.uuid
      }, Buffer.from(env.JWT_SECRET, 'base64'), {
        expiresIn: config.accessTokenLife
      });

      let refreshToken = jwt.sign({
        uuid:user.uuid
      }, Buffer.from(env.JWT_REFRESH_SECRET, 'base64'), {
        expiresIn: config.refreshTokenLife
      });

      return {accessToken, refreshToken}
    },

    _refresh: async (root, {refreshToken}, {db}) => {

      let freshAccessToken, freshRefreshToken;

      try {

        let payload = jwt.verify(refreshToken, Buffer.from(env.JWT_REFRESH_SECRET, 'base64'));

        let uuid = payload.uuid || null;

        if (uuid) {

          let user = await db.User.findByPk(uuid);

          if (user) {

            freshAccessToken = jwt.sign({
              uuid:user.uuid
            }, Buffer.from(env.JWT_SECRET, 'base64'), {
              expiresIn: config.accessTokenLife
            });

            freshRefreshToken = jwt.sign({
              uuid:user.uuid
            }, Buffer.from(env.JWT_REFRESH_SECRET, 'base64'), {
              expiresIn: config.refreshTokenLife
            });

          } else {
            throw new AuthenticationError("User no longer exists.");
          }

        } else {
          throw new AuthenticationError("Corrupt payload format.");
        }

      } catch (err) {
        throw new AuthenticationError("Invalid refresh token.");
      }

      return {
        accessToken: freshAccessToken,
        refreshToken: freshRefreshToken
      }
    }
  }
}

export {type, resolvers}
