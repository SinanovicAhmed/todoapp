const express = require("express");
const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ msg: "Get tasks" });
});

router.post("/", (req, res) => {
  res.json({ msg: `Post task: ${req.body.task}` });
});
router.put("/:id", (req, res) => {
  res.json({ msg: `Put task ${req.params.id}` });
});
router.delete("/:id", (req, res) => {
  res.json({ msg: `Delete task ${req.params.id}` });
});

module.exports = router;
