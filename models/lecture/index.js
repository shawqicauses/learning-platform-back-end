const mongoose = require("mongoose")

// DONE REVIEWING
const lectureSchema = new mongoose.Schema(
  {
    "code": {
      type: String,
      required: [true, "A lecture must have a code"],
      unique: true,
      trim: true
    },
    "name": {
      type: String,
      required: [true, "A lecture must have a name"],
      trim: true
    },
    "description": {
      type: String,
      required: [true, "A lecture must have a description"],
      trim: true
    },
    "content": {
      type: String,
      required: [true, "A lecture must have a content"],
      trim: true
    },
    "cover-image": {
      type: String,
      required: [true, "A lecture must have a cover image"],
      trim: true
    },
    "url": {
      type: String,
      required: [true, "A lecture must have a URL"],
      trim: true
    },
    "duration": {
      type: String,
      required: [true, "A lecture must have a duration"]
    },
    "subject-id": {
      type: String,
      required: [true, "A lecture must have a subject ID"],
      trim: true
    },
    "schedule-id": {
      type: String,
      required: [true, "A lecture must have a schedule ID"],
      trim: true
    },
    "teacher-id": {
      type: String,
      required: [true, "A lecture must have a teacher ID"],
      trim: true
    },
    "request-time": {
      type: Date,
      required: [true, "A lecture must have a request time"],
      default: Date.now()
    }
  },
  {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
  }
)

const Lecture = mongoose.model("Lecture", lectureSchema)
module.exports = Lecture
