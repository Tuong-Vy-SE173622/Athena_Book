const mongoose = require("mongoose");
const slugify = require("slugify");

const CategorySchema = mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100,
    unique: true,
  },
  categorySlug: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

CategorySchema.pre("save", async function () {
  if (!this.isModified("categoryName")) return;

  const slugify = require("slugify");

  let baseSlug = slugify(this.categoryName, {
    lower: true,
    strict: true,
  });

  let slug = baseSlug;
  let count = 1;

  const Category = mongoose.model("Category");

  while (await Category.findOne({ categorySlug: slug })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  this.categorySlug = slug;
});

module.exports = mongoose.model("Category", CategorySchema);
