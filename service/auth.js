const jwt = require("jsonwebtoken");

function setUser(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role || "NORMAL",
    },
    process.env.JWT_SECRET
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
