const mongoose = require("mongoose")

const languageSchema = new mongoose.Schema({
  "name": {
    type: String,
    required: [true, "A language must have a name"],
    unique: true,
    trim: true
  },
  "short-name": {
    type: String,
    required: [true, "A language must have a short name"],
    unique: true,
    trim: true
  },
  "direction": {
    type: String,
    required: [true, "A language must have a direction"],
    trim: true
  },
  "direction-word": {
    type: String,
    required: [true, "A language must have a direction word"],
    trim: true
  },
  "icon": {
    type: String,
    required: [true, "A language must have an icon"]
  }
})

const Language = mongoose.model("Language", languageSchema)
module.exports = Language
