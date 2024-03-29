const mongoose = require("mongoose")

// DONE REVIEWING
const subjectSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "A subject must have a code"],
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: [true, "A subject must have a name"],
      trim: true
    }
  },
  {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
  }
)

subjectSchema.virtual("groups", {
  ref: "Subject-Enrollment",
  localField: ["_", "id"].join(""),
  foreignField: "subject"
})

const Subject = mongoose.model("Subject", subjectSchema)
module.exports = Subject
