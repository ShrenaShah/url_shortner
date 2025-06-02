const express = require("express");
const path = require("path");
require("dotenv").config();
const { connectToMongodb } = require("./connect");
const urlRoute = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const app = express();
const PORT = process.env.PORT || 8000;

connectToMongodb(process.env.MONGODB_URI)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.set("view engine", "ejs"); // app.set is used to configure settings for your express ap[lication]
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/url", urlRoute);
app.use("/", staticRouter);
app.listen(PORT, () => console.log(`server started at port : ${PORT}`));
