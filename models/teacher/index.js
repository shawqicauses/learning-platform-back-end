const mongoose = require("mongoose")

// DONE REVIEWING
const teacherSchema = new mongoose.Schema({
  "first-name": {
    type: String,
    required: [true, "A teacher must have a first name"],
    trim: true
  },
  "second-name": {
    type: String,
    required: [true, "A teacher must have a second name"],
    trim: true
  },
  "last-name": {
    type: String,
    required: [true, "A teacher must have a last name"],
    trim: true
  },
  "email": {
    type: String,
    required: [true, "A teacher must have an email"],
    unique: true,
    trim: true
  },
  "password": {
    type: String,
    required: [true, "A teacher must have a password"],
    trim: true
  },
  "phone-number": {
    type: String,
    required: [true, "A teacher must have a phone number"],
    trim: true
  },
  "active-subjects": {
    type: Array,
    required: [true, "A teacher must have an active subjects"]
  },
  "archived-subjects": {
    type: Array,
    required: [true, "A teacher must have an archived subjects"]
  }
})

const Teacher = mongoose.model("Teacher", teacherSchema)
module.exports = Teacher
