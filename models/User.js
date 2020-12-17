const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
  },
  image: {
    type: String,
  },
  role: {
    type: Number,
    require: true,
  },
});

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    } else {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          next(err);
        } else {
          user.password = hash;
          next();
        }
      });
    }
  });
});

mongoose.model("User", userSchema);
