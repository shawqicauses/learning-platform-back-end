const mongoose = require("mongoose")

// Group ID and Student ID (Unique)
// DON REVIEWING
const registrationSchema = new mongoose.Schema({
  "code": {
    type: String,
    required: [true, "A registration must have a code"],
    unique: true,
    trim: true
  },
  "group-id": {
    type: String,
    required: [true, "A registration must have a group ID"],
    trim: true
  },
  "student-id": {
    type: String,
    required: [true, "A registration must have a student ID"],
    trim: true
  },
  "registration-date": {
    type: Date,
    required: [true, "A registration must have a date"],
    trim: true
  },
  "status": {
    type: Number,
    required: [true, "A registration must have a status"],
    trim: true
  }
})

const Registration = mongoose.model("Registration", registrationSchema)
module.exports = Registration
