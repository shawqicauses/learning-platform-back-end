const mongoose = require("mongoose")

// DONE REVIEWING
const subjectSchema = new mongoose.Schema({
  "code": {
    type: String,
    required: [true, "A subject must have a code"],
    unique: true,
    trim: true
  },
  "name": {
    type: String,
    required: [true, "A subject must have a name"],
    trim: true
  },
  "weekly-hours": {
    type: Number,
    required: [true, "A subject must have a weekly hours"],
    trim: true
  },
  "total-hours": {
    type: Number,
    required: [true, "A subject must have a total hours"],
    trim: true
  }
})

const Subject = mongoose.model("Subject", subjectSchema)
module.exports = Subject
