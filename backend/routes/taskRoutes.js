const express = require("express");
const router = require("express").Router();
const Task = require("../models/taskModel");

router.get("/:id", async (req, res) => {
  const userID = req.params.id;

  const tasks = await Task.find({ userID });
  res.json({ tasks });
});

router.post("/", async (req, res) => {
  const { userID, categoryID, taskText, taskHeadline } = req.body;
  try {
    const task = await Task.create({
      userID: userID,
      categoryID: categoryID,
      taskHeadline: taskHeadline,
      taskText: taskText,
    });
    res.json({
      _id: task.id,
      userID: task.userID,
      categoryID: task.categoryID,
      taskHeadline: task.taskHeadline,
      taskText: task.taskText,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
});
router.put("/:id", async (req, res) => {
  const taskID = req.params.id;
  const categoryID = req.body.categoryID;
  try {
    await Task.findOneAndUpdate(
      {
        _id: taskID,
      },
      {
        categoryID: categoryID,
      }
    );
    res.json({ msg: "Update succesfull" });
  } catch (e) {
    res.json({ msg: e.message });
  }
});
router.put("/contentUpdate/:id", async (req, res) => {
  const taskID = req.params.id;
  const header = req.body.taskHeadline;
  const text = req.body.taskText;
  if (!header || !text) {
    res.json({ msg: "Invalid params" });
  } else {
    try {
      await Task.findOneAndUpdate(
        {
          _id: taskID,
        },
        {
          taskHeadline: header,
          taskText: text,
        }
      );
      res.json({ msg: "Update succesfull" });
    } catch (e) {
      res.json({ msg: e.message });
    }
  }
});
router.delete("/:id", async (req, res) => {
  const taskID = req.params.id;
  try {
    await Task.findOneAndDelete({ _id: taskID });
    res.json({ msg: "Item is deleted" });
  } catch (e) {
    res.json({ msg: e.message });
  }
});

module.exports = router;
