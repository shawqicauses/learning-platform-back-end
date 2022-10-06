const mongoose = require("mongoose")

// DONE REVIEWING
const studentSchema = mongoose.Schema({
  "name": {
    type: String,
    required: [true, "A student must have a name"],
    trim: true
  },
  "role": {
    type: String,
    required: [true, "A student must have a role"],
    trim: true
  },
  "first-name": {
    type: String,
    required: [true, "A student must have a first name"],
    trim: true
  },
  "second-name": {
    type: String,
    required: [true, "A student must have a second name"],
    trim: true
  },
  "last-name": {
    type: String,
    required: [true, "A student must have a last name"],
    trim: true
  },
  "email": {
    type: String,
    required: [true, "A student must have an email"],
    unique: true,
    trim: true
  },
  "password": {
    type: String,
    required: [true, "A student must have a password"],
    trim: true
  },
  "phone-number": {
    type: String,
    required: [true, "A student must have a phone number"],
    trim: true
  },
  "group-id": {
    type: String,
    required: [true, "A student must have a group"],
    trim: true
  }
})

const Student = mongoose.model("Student", studentSchema)
module.exports = Student
