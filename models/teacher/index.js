const mongoose = require("mongoose")
const validator = require("validator")

// DONE REVIEWING
const teacherSchema = new mongoose.Schema(
  {
    "first-name": {
      type: String,
      required: [true, "A teacher must have a first name"],
      trim: true
    },
    "second-name": {
      type: String,
      required: [true, "A teacher must have a second name"],
      trim: true
    },
    "last-name": {
      type: String,
      required: [true, "A teacher must have a last name"],
      trim: true
    },
    "email": {
      type: String,
      required: [true, "A teacher must have an email"],
      validate: [validator.isEmail, "A teacher must have a valid email"],
      unique: true,
      trim: true,
      lowercase: true
    },
    "password": {
      type: String,
      required: [true, "A teacher must have a password"],
      select: false,
      trim: true,
      minlength: 8
    },
    "password-confirm": {
      type: String,
      required: [true, "A teacher must have a password confirm"],
      validate: {
        message: "Password confirm must match password",
        // This only works on .create() and .save()
        validator(element) {
          return element === this.password
        }
      }
    },
    "phone-number": {
      type: String,
      required: [true, "A teacher must have a phone number"],
      trim: true
    },
    "active-subjects": {
      type: Array,
      required: [true, "A teacher must have an active subjects"]
    },
    "archived-subjects": {
      type: Array,
      required: [true, "A teacher must have an archived subjects"]
    }
  },
  {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
  }
)

teacherSchema.virtual("name").get(function callback() {
  return [this["first-name"], this["second-name"], this["last-name"]].join(" ")
})

const Teacher = mongoose.model("Teacher", teacherSchema)
module.exports = Teacher
