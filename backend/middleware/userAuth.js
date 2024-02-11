const passport = require("passport");
require("../auth/passportHandler");

const responseHandler = require("../utils/response");

exports.authenticateJWT = (req, res, next) => {
  passport.authenticate("jwt", function (err, user, info) {
    if (err) {
      return responseHandler.unauthorized(res);
    }
    if (!user) {
      return responseHandler.unauthorized(res);
    } else {
      req.user = user;
      return next();
    }
  })(req, res, next);
};

exports.checkPermission = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return responseHandler.unauthorized(res);
    } else {
      const role = req.user.role;
      if (allowedRoles.includes(role)) {
        return next();
      } else {
        return responseHandler.forbidden(res);
      }
    }
  };
};
