const express = require("express");
const app = express();
const PORT = 5000;
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

//models
require("./models/User");

//routers
const AuthRouter = require("./routes/AuthRouter");

//middlewares
app.use(cors());
app.use("/public", express.static("./public"));
app.use(AuthRouter);

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});

mongoose
  .connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongo db");
  })
  .catch((err) => {
    console.log(err);
  });
