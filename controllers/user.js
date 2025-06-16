const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");
const User = require("../models/user");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).render("signup", {
      error: "User already exists. Please login or use a different email.",
    });
  }
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", {
      error: "Invalid email or password",
    });
  }

  const token = setUser(user);
  res.cookie("token", token);
  return res.redirect("/");
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
