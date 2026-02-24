const express = require("express");
const route = express.Router();
const categoryRepository = require("../repositories/category.repository");

route.post("/", async (req, res) => {
  try {
    const category = await categoryRepository.createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

route.get("/", async (req, res) => {
  try {
    const category = await categoryRepository.getAllCategories();
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

route.get("/:id", async (req, res) => {
  try {
    const category = await categoryRepository.getCategoryById(req.params.id);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

route.put("/:id", async (req, res) => {
  try {
    console.log(req.body);
    const category = await categoryRepository.updateCategory(
      req.params.id,
      req.body,
    );
    if (!category) {
      res.status(404).json({ message: "Category not found" });
    }
    res
      .status(200)
      .json({ message: "Category Update Successfully!", category });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

route.delete("/:id", async (req, res) => {
  try {
    const category = await categoryRepository.deleteCategoryById(req.params.id);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

route.get("/slug/:slug", async (req, res) => {
  try {
    const category = await categoryRepository.getCategoryBySlug(
      req.params.slug,
    );
    if (!category) {
      res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = route;
