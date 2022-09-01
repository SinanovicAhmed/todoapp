const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  categoryName: {
    type: String,
    required: [true, "Name missing"],
  },
  userID: {
    type: String,
    required: [true, "userID missing"],
  },
});

module.exports = mongoose.model("Category", categorySchema);
