const mongoose = require("mongoose")
const validator = require("validator")
const bcryptjs = require("bcryptjs")

// DONE REVIEWING
const studentSchema = new mongoose.Schema(
  {
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
      validate: [validator.isEmail, "A student must have a valid email"],
      unique: true,
      trim: true,
      lowercase: true
    },
    "password": {
      type: String,
      required: [true, "A student must have a password"],
      select: false,
      trim: true,
      minlength: 8
    },
    "password-confirm": {
      type: String,
      required: [true, "A student must have a password confirm"],
      validate: {
        message: "Password confirm must match password",
        // This only works on .create() and .save()
        validator(element) {
          return element === this.password
        }
      },
      trim: true,
      minlength: 8
    },
    "group-id": {
      type: String,
      required: [true, "A student must have a group"],
      trim: true
    }
  },
  {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
  }
)

studentSchema.pre("save", async function callback(next) {
  // 1. Only run this function if password was actually modified
  // 2. Hash password field with cost of 12
  // 3. Delete password confirm field from database
  if (!this.isModified("password")) return next() // 1.
  this.password = await bcryptjs.hash(this.password, 12) // 2.
  this["password-confirm"] = undefined // 3.
  next()
})

studentSchema.virtual("name").get(function callback() {
  return [this["first-name"], this["second-name"], this["last-name"]].join(" ")
})

studentSchema.methods.correctPassword = async function correctPassword(
  candidatePassword,
  userPassword
) {
  return await bcryptjs.compare(candidatePassword, userPassword)
}

const Student = mongoose.model("Student", studentSchema)
module.exports = Student
