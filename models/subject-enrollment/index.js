const mongoose = require("mongoose")

const subjectEnrollmentSchema = new mongoose.Schema(
  {
    group: {
      type: mongoose.Schema.ObjectId,
      ref: "Group",
      required: [true, "A group subject must have a group"],
      trim: true
    },
    subject: {
      type: mongoose.Schema.ObjectId,
      ref: "Subject",
      required: [true, "A group subject must have a subject"],
      trim: true
    }
  },
  {
    strict: false,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
  }
)

subjectEnrollmentSchema.index({group: 1, subject: 1}, {unique: true})
const SubjectEnrollment = mongoose.model(
  "Subject-Enrollment",
  subjectEnrollmentSchema
)

module.exports = SubjectEnrollment
