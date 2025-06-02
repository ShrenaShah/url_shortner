const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  const baseUrl =
    process.env.BASE_URL || `${req.protocol}://${req.headers.host}`;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortId = nanoid();
  await URL.create({
    shortId,
    redirectURL: body.url,
    visitHistory: [],
  });

  const allurls = await URL.find({});
  return res.render("home", {
    id: shortId,
    urls: allurls,
    baseUrl,
  });
}

async function getUrlData(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: { visitHistory: { timestamp: Date.now() } },
    }
  );
  res.redirect(entry.redirectURL);
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  if (!result) {
    return res.status(404).json({ error: "Short URL not found" });
  }
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  getUrlData,
};
