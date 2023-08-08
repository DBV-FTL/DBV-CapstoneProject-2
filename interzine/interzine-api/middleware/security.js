const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../utils/errors");

const jwtFrom = ({ headers }) => {
    if (headers?.authorization) {
      const [scheme, token] = headers.authorization.split(" ");
      if (scheme.trim() === "Bearer") {
        return token;
      }
    }
    return undefined;
  };
  
  const extractUserFromJWT = (req, res, next) => {
    try {
      const token = jwtFrom(req);
      console.log('extracting', token)
      if (token) {
        console.log(jwt.verify(token, SECRET_KEY))
        res.locals.user = jwt.verify(token, SECRET_KEY);
      }
      return next();
    } catch (err) {
      return next();
    }
  };
  
  const requireAuthenticatedUser = (req, res, next) => {
    try {
      const { user } = res.locals;
      if (!user?.email) {
        throw new UnauthorizedError();
      }
      return next();
    } catch (err) {
      return next(err);
    }
  };
  
  module.exports = {
    requireAuthenticatedUser,
    extractUserFromJWT,
    jwtFrom,
  };
  