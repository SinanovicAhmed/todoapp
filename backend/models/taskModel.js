const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  userID: {
    type: String,
    required: [true, "UserID missing"],
  },
  categoryID: {
    type: String,
    required: [true, "categoryID missing"],
  },
  taskHeadline: {
    type: String,
    require: [true, "Task headline missing"],
  },
  taskText: {
    type: String,
    require: [true, "Task text missing"],
  },
});

module.exports = mongoose.model("Taks", taskSchema);
