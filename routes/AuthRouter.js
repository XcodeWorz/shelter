const express = require("express");
const AuthRouter = express.Router();
const multer = require("multer");
const folder = "./public/";
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const fileType = file.mimetype.split("/");
    cb(null, `${uuidv4()}.${fileType[1]}`);
  },
});

const upload = multer({
  storage: storage,
});

AuthRouter.post("/signup", upload.single("image"), (req, res) => {
  const { name, email, confirmPassword, password } = req.body;
  const imagePath = `${req.protocol}://${req.headers.host}/public/${req.file.filename}`;

  const user = new User({
    name,
    email,
    password,
    role: 1,
    image: imagePath,
  });

  user
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = AuthRouter;
