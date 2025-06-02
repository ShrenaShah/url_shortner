const express = require("express");
const URL = require("../models/url");
const router = express.Router();
router.get("/", async (req, res) => {
  const allurls = await URL.find({});
  const baseUrl =
    process.env.BASE_URL || `${req.protocol}://${req.headers.host}`;
  return res.render("home", {
    id: null,
    urls: allurls,
    baseUrl,
  });
});
module.exports = router;
