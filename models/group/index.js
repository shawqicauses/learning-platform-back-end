const mongoose = require("mongoose")

// DONE REVIEWING
const groupSchema = mongoose.Schema(
  {
    "code": {
      type: String,
      required: [true, "A group must have a code"],
      unique: true,
      trim: true
    },
    "name": {
      type: String,
      required: [true, "A group must have a name"],
      trim: true
    },
    "subject-id": {
      type: String,
      required: [true, "A group must have a subject ID"],
      trim: true
    },
    "teacher-id": {
      type: String,
      required: [true, "A group must have a teacher ID"],
      trim: true
    },
    "start-date": {
      type: Date,
      required: [true, "A group must have a start date"],
      trim: true
    },
    "end-date": {
      type: Date,
      required: [true, "A group must have an end date"],
      trim: true
    },
    "status": {
      type: Number,
      required: [true, "A group must have a status"],
      trim: true
    }
  },
  {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
  }
)

const Group = mongoose.model("Group", groupSchema)
module.exports = Group
