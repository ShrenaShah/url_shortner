const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { connectToMongodb } = require("./connect");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");

const app = express();
const PORT = process.env.PORT || 8000;

const urlRoute = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/user");

connectToMongodb(process.env.MONGODB_URI)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.set("view engine", "ejs"); // app.set is used to configure settings for your express ap[lication]
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/", staticRouter);
app.use("/user", userRouter);

app.listen(PORT, () => console.log(`server started at port : ${PORT}`));
