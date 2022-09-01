const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username missing"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email missing"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "Password missing"],
  },
});

module.exports = mongoose.model("User", userSchema);
