const express = require("express");
const URL = require("../models/url");
const router = express.Router();
const { restrictTo } = require("../middlewares/auth");

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
  const allurls = await URL.find({});
  const baseUrl =
    process.env.BASE_URL || `${req.protocol}://${req.headers.host}`;
  return res.render("home", {
    id: null,
    urls: allurls,
    baseUrl,
  });
});

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  const allurls = await URL.find({ createdBy: req.user._id });
  const baseUrl =
    process.env.BASE_URL || `${req.protocol}://${req.headers.host}`;
  return res.render("home", {
    id: null,
    urls: allurls,
    baseUrl,
  });
});

router.get("/signup", async (req, res) => {
  return res.render("signup");
});

router.get("/login", async (req, res) => {
  return res.render("login");
});
module.exports = router;
