const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/connectDB");
const router = require("./routers/userRouter");
const postRouters = require("./routers/postRouter");
require("dotenv").config();

const app = express();

//connect mongoDB database
connectDB();
app.use(bodyParser.json());
app.use("/", router);
app.use("/", postRouters);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Your app is running", port);
});
