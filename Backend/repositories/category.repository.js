const Category = require("../models/category.model");

//CREATE
const createCategory = async (data) => {
  return await Category.create(data);
};

//GET ALL
const getAllCategories = async () => {
  return await Category.find();
};

//GET BY ID
const getCategoryById = async (id) => {
  return await Category.findById(id);
};

//UPDATE
const updateCategory = async (id, data) => {
  const category = await Category.findById(id);
  if (!category) return null;

  category.categoryName = data.categoryName;

  return await category.save();
};

//DELETE
const deleteCategoryById = async (id) => {
  return await Category.findByIdAndDelete(id);
};

//GET CATEGORY BY SLUG
const getCategoryBySlug = async (slug) => {
  return await Category.findOne({ categorySlug: slug });
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategoryById,
  getCategoryBySlug,
};
