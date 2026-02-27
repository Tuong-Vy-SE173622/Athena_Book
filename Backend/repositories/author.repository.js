const Author = require("../models/author.model");

//CREATE
const createAuthor = async (data) => {
  return await Author.create(data);
};

//GET ALL
const getAllAuthors = async () => {
  return await Author.find();
};

//GET BY ID
const getAuthorById = async (id) => {
  return await Author.findById(id);
};

//UPDATE
const updateAuthor = async (id, data) => {
  const author = await Author.findById(id);
  if (!author) return null;
  Object.assign(author, data);
  return await author.save();
};

//DELETE
const deleteAuthorById = async (id) => {
  return await Author.findByIdAndDelete(id);
};

//GET Author BY SLUG
const getAuthorBySlug = async (slug) => {
  return await Author.findOne({ authorSlug: slug });
};

module.exports = {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthorById,
  getAuthorBySlug,
};
