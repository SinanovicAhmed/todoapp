const express = require("express");
const router = require("express").Router();
const Category = require("../models/categoryModel");

router.get("/:id", async (req, res) => {
  const userID = req.params.id;
  const categories = await Category.find({ userID });
  res.json({ categories });
});

router.post("/", async (req, res) => {
  const { userID, categoryName } = req.body;
  try {
    const category = await Category.create({
      userID,
      categoryName,
    });
    res.json({
      _id: category.id,
      userID: category.userID,
      categoryName: category.categoryName,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
});
router.put("/:id", async (req, res) => {
  const categoryID = req.params.id;
  const name = req.body.name;
  try {
    await Category.findOneAndUpdate(
      {
        _id: categoryID,
      },
      {
        categoryName: name,
      }
    );
    res.json({ msg: "Update succesfull" });
  } catch (e) {
    res.json({ msg: e.message });
  }
});
router.delete("/:id", async (req, res) => {
  const categoryID = req.params.id;
  try {
    await Category.findOneAndDelete({ _id: categoryID });
    res.json({ msg: "Item is deleted" });
  } catch (e) {
    res.json({ msg: e.message });
  }
});

module.exports = router;
