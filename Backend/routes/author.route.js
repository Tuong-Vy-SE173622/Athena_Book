const express = require("express");
const route = express.Router();
const authorRepository = require("../repositories/author.repository");
const upload = require("../middleware/multer");
const uploadToCloudinary = require("../helper/uploadToCloudinary");

route.post("/", upload.single("authorAvatar"), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.authorAvatar = await uploadToCloudinary(req.file.buffer);
    }
    const author = await authorRepository.createAuthor(data);
    res.status(201).json(author);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

route.get("/", async (req, res) => {
  try {
    const author = await authorRepository.getAllAuthors();
    res.status(200).json(author);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

route.get("/:id", async (req, res) => {
  try {
    const author = await authorRepository.getAuthorById(req.params.id);
    if (!author) {
      res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json(author);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

route.put("/:id", upload.single("authorAvatar"), async (req, res) => {
  try {
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);
    const data = { ...req.body };
    if (req.file) {
      data.authorAvatar = await uploadToCloudinary(req.file.buffer);
    }
    const author = await authorRepository.updateAuthor(req.params.id, data);
    if (!author) {
      res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json({ message: "Author Update Successfully!", author });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

route.delete("/:id", async (req, res) => {
  try {
    const author = await authorRepository.deleteAuthorById(req.params.id);
    if (!author) {
      res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

route.get("/slug/:slug", async (req, res) => {
  try {
    const author = await authorRepository.getAuthorBySlug(req.params.slug);
    if (!author) {
      res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json(author);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = route;
