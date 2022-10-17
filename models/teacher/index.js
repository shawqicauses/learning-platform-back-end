const mongoose = require("mongoose")
const User = require("../user")

// DONE REVIEWING
const teacherSchema = new mongoose.Schema({
  "active-subjects": {
    type: Array,
    required: [true, "A teacher must have an active subjects"]
  },
  "archived-subjects": {
    type: Array,
    required: [true, "A teacher must have an archived subjects"]
  }
})

const Teacher = User.discriminator("Teacher", teacherSchema)
module.exports = Teacher
