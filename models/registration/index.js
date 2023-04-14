const mongoose = require("mongoose")

// Group ID and Student ID (Unique)
// DON REVIEWING
const registrationSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "A registration must have a code"],
      unique: true,
      trim: true
    },
    date: {
      type: Date,
      required: [true, "A registration must have a date"],
      trim: true
    },
    status: {
      type: Number,
      required: [true, "A registration must have a status"],
      trim: true
    },
    group: {
      type: mongoose.Schema.ObjectId,
      ref: "Group",
      required: [true, "A registration must have a group"],
      trim: true
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A registration must have a user"],
      trim: true
    }
  },
  {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
  }
)

registrationSchema.index({group: 1, user: 1}, {unique: true})
const Registration = mongoose.model("Registration", registrationSchema)
module.exports = Registration
