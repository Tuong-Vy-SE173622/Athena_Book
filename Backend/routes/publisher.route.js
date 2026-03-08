const express = require("express");
const route = express.Router();
const publisherRepository = require("../repositories/publisher.repository");
const upload = require("../middleware/multer");
const uploadToCloudinary = require("../helper/uploadToCloudinary");

route.post("/", upload.single("logo"), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.logo = await uploadToCloudinary(req.file.buffer);
    }
    const publisher = await publisherRepository.createPublisher(data);
    res.status(201).json(publisher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

route.get("/", async (req, res) => {
  try {
    const publisher = await publisherRepository.getAllPublishers();
    res.status(200).json(publisher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

route.get("/:id", async (req, res) => {
  try {
    const publisher = await publisherRepository.getPublisherById(req.params.id);
    if (!publisher) {
      res.status(404).json({ message: "Publisher not found" });
    }
    res.status(200).json(publisher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

route.put("/:id", upload.single("logo"), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.logo = await uploadToCloudinary(req.file.buffer);
    } else {
      delete data.logo;
    }
    const publisher = await publisherRepository.updatePublisher(
      req.params.id,
      data,
    );
    if (!publisher) {
      res.status(404).json({ message: "Publisher not found" });
    }
    res
      .status(200)
      .json({ message: "Publisher Update Successfully!", publisher });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

route.delete("/:id", async (req, res) => {
  try {
    const publisher = await publisherRepository.deletePublisherById(
      req.params.id,
    );
    if (!publisher) {
      res.status(404).json({ message: "Publisher not found" });
    }
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

route.get("/slug/:slug", async (req, res) => {
  try {
    const publisher = await publisherRepository.getPublisherBySlug(
      req.params.slug,
    );
    if (!publisher) {
      res.status(404).json({ message: "Publisher not found" });
    }
    res.status(200).json(publisher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = route;
