const passport = require("passport");
require("../auth/passportHandler");

const authenticateJWT = (req, res, next) => {
  passport.authenticate("jwt", function (err, user, info) {
    if (err) {
      return res.status(401).json({ status: "error", code: "unauthorized" });
    }
    if (!user) {
      return res.status(401).json({ status: "error", code: "unauthorized" });
    } else {
      req.user = user;
      return next();
    }
  })(req, res, next);
};

export { authenticateJWT };
