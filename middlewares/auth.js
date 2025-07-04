const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null;

  if (!tokenCookie) return next();
  const token = tokenCookie;
  const user = getUser(token);

  req.user = user;
  return next();
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.render("auth_required");

    if (!roles.includes(req.user.role)) {
      return res.end("You are not authorized to access this resource");
    }
    return next();
  };
}
module.exports = {
  checkForAuthentication,
  restrictTo,
};
