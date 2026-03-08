const Publisher = require("../models/publisher.model");

//CREATE
const createPublisher = async (data) => {
  return await Publisher.create(data);
};

//GET ALL
const getAllPublishers = async () => {
  return await Publisher.find();
};

//GET BY ID
const getPublisherById = async (id) => {
  return await Publisher.findById(id);
};

//UPDATE
const updatePublisher = async (id, data) => {
  const publisher = await Publisher.findById(id);
  if (!publisher) return null;
  Object.assign(publisher, data);
  return await publisher.save();
};

//DELETE
const deletePublisherById = async (id) => {
  return await Publisher.findByIdAndDelete(id);
};

//GET Publisher BY SLUG
const getPublisherBySlug = async (slug) => {
  return await Publisher.findOne({ slug: slug });
};

module.exports = {
  createPublisher,
  getAllPublishers,
  getPublisherById,
  updatePublisher,
  deletePublisherById,
  getPublisherBySlug,
};
