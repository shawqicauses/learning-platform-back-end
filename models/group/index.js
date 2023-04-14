const mongoose = require("mongoose")

// DONE REVIEWING
const groupSchema = new mongoose.Schema(
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

groupSchema.virtual("registrations", {
  ref: "Registration",
  localField: ["_", "id"].join(""),
  foreignField: "group"
})

groupSchema.virtual("subjects", {
  ref: "Subject-Enrollment",
  localField: ["_", "id"].join(""),
  foreignField: "group"
})

const Group = mongoose.model("Group", groupSchema)
module.exports = Group
