const mongoose = require("mongoose");
const slugify = require("slugify");

const AuthorSchema = mongoose.Schema({
  authorName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100,
    unique: true,
  },
  authorSlug: {
    type: String,
    unique: true,
  },
  authorBiography: {
    type: String,
  },
  authorAvatar: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

AuthorSchema.pre("save", async function () {
  if (!this.isModified("authorName")) return;

  const slugify = require("slugify");

  let baseSlug = slugify(this.authorName, {
    lower: true,
    strict: true,
  });

  let slug = baseSlug;
  let count = 1;

  const Author = mongoose.model("Author");

  while (await Author.findOne({ authorSlug: slug })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  this.authorSlug = slug;
});

module.exports = mongoose.model("Author", AuthorSchema);
