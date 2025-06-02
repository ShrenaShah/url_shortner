const express = require("express");
const {
  handleGenerateNewShortURL,
  getUrlData,
  handleGetAnalytics,
} = require("../controllers/url");
const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get("/:shortId", getUrlData);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
