const mongoose = require("mongoose")
const User = require("../user")

// DONE REVIEWING
const studentSchema = new mongoose.Schema({
  "group-id": {
    type: String,
    required: [true, "A student must have a group"],
    default: "not-defined",
    trim: true
  }
})

const Student = User.discriminator("Student", studentSchema)
module.exports = Student
