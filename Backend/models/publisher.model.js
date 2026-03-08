const mongoose = require("mongoose");
const slugify = require("slugify");

const PublisherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 150,
    unique: true,
  },

  slug: {
    type: String,
    unique: true,
    index: true,
  },

  logo: {
    type: String,
  },

  description: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

PublisherSchema.pre("save", async function () {
  if (!this.isModified("name")) return;

  const slugify = require("slugify");

  let baseSlug = slugify(this.name, {
    lower: true,
    strict: true,
  });

  let slug = baseSlug;
  let count = 1;

  const Publisher = mongoose.model("Publisher");

  while (await Publisher.findOne({ slug: slug })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  this.slug = slug;
});

module.exports = mongoose.model("Publisher", PublisherSchema);
